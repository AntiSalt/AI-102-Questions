#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
import re
import shutil
from pathlib import Path

def extract_answer_from_ref(ref_text, scheme_labels):
    """从参考答案文本中提取答案"""
    answers = []
    
    # 查找所有"- 方案 X：**能（Yes）**"的行
    pattern = r'- 方案\s+([A-Z]|\d+)：\*\*能'
    for match in re.finditer(pattern, ref_text):
        label = match.group(1)
        
        if label.isdigit():
            # 数字转字母 1->A, 2->B, 3->C
            idx = int(label) - 1
            if idx < len(scheme_labels):
                answers.append(scheme_labels[idx])
        else:
            answers.append(label)
    
    return '、'.join(sorted(set(answers))) if answers else ''

def parse_q17_18(md_content):
    """专门处理第17和18题"""
    result = {}
    labels = ['A', 'B', 'C', 'D', 'E', 'F']
    
    for q_id in [17, 18]:
        q = {'id': q_id, 'background': '', 'title': '', 'options': [], 'answer': ''}
        
        pattern = rf'## 第 {q_id} 题\n(.*?)(?=## 第 \d+ 题|$)'
        match = re.search(pattern, md_content, re.DOTALL)
        
        if not match:
            result[q_id] = q
            continue
        
        q_block = match.group(1)
        
        # 提取背景
        bg_match = re.search(r'\*\*背景\*\*\s*\n+(.*?)(?=\n+\*\*|\n+这|以下)', q_block, re.DOTALL)
        if bg_match:
            q['background'] = bg_match.group(1).strip()
        
        # 提取题目 - 通常在背景后面或作为最后一行
        if q_id == 17:
            title_match = re.search(r'\*\*题目\*\*\s*\n+(.*?)(?=\n+\*\*选项)', q_block, re.DOTALL)
            if title_match:
                q['title'] = title_match.group(1).strip()
        elif q_id == 18:
            # 第18题没有**题目**标头，从背景提取
            lines = q['background'].split('\n')
            if lines and (lines[-1].endswith('？') or lines[-1].endswith('?')):
                q['title'] = lines[-1]
                q['background'] = '\n'.join(lines[:-1]).strip()
        
        # 提取选项
        # 第17题使用**选项 A（）**格式
        if q_id == 17:
            pattern = r'\*\*选项\s+([A-Z])\（([^）]*)\）\*\*：([^\n]*)'
            for m in re.finditer(pattern, q_block):
                label = m.group(1)
                description = m.group(2)
                text = m.group(3).strip()
                
                # 选项text为description: text
                full_text = f"{description}: {text}" if text else description
                q['options'].append({'label': label, 'text': full_text})
        
        # 第18题使用方案1/2/3格式
        elif q_id == 18:
            pattern = r'方案\s+(\d+)：([^\n]*(?:\n(?!方案\s+\d)[^\n]*)*)'
            for idx, m in enumerate(re.finditer(pattern, q_block)):
                if idx >= len(labels):
                    break
                
                scheme_num = m.group(1)
                text = m.group(2).strip()
                
                # 移除末尾的箭头
                text = re.sub(r'\s*→\s*能否解决\??\s*$', '', text)
                
                q['options'].append({'label': labels[idx], 'text': text})
        
        # 提取答案 - 从参考答案部分
        ref_match = re.search(r'\*\*参考答案：\*\*(.*?)(?=\n\*\*|\n\n|$)', q_block, re.DOTALL)
        if ref_match:
            ref_text = ref_match.group(1)
            
            # 对于方案类题目，找出哪些能（Yes）
            if '方案' in ref_text and '能' in ref_text:
                q['answer'] = extract_answer_from_ref(ref_text, labels)
        
        result[q_id] = q
    
    return result

# 主程序
json_file = Path('data/questions.json')
md_file = Path('data/AI-102_中文题库_1-300.md')

with open(json_file, 'r', encoding='utf-8') as f:
    questions = json.load(f)

with open(md_file, 'r', encoding='utf-8') as f:
    md_content = f.read()

# 解析第17和18题
fixes = parse_q17_18(md_content)

print("\n" + "="*70)
print("修复第17和18题...")
print("="*70)

# 保存备份
backup_file = json_file.with_name(f'{json_file.stem}.backup')
if not backup_file.exists():
    shutil.copy(json_file, backup_file)
    print(f"\n✓ 备份：{backup_file}")

# 应用修复
for q_id, fixed_data in fixes.items():
    for q in questions:
        if q['id'] == q_id:
            # 更新各字段
            if not q.get('background') and fixed_data['background']:
                q['background'] = fixed_data['background']
            if not q.get('title') and fixed_data['title']:
                q['title'] = fixed_data['title']
            if (not q.get('options') or len(q['options']) == 0) and fixed_data['options']:
                q['options'] = fixed_data['options']
            if not q.get('answer') and fixed_data['answer']:
                q['answer'] = fixed_data['answer']
            
            print(f"\n✓ 第 {q_id} 题已修复：")
            print(f"    Answer: {q['answer']}")
            break

# 保存
with open(json_file, 'w', encoding='utf-8') as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

print(f"\n✓ 已保存到 {json_file}")

# 最终验证
print("\n" + "="*70)
print("最终验证：")
print("="*70)

for q_id in [17, 18]:
    q = next((q for q in questions if q['id'] == q_id), None)
    if q:
        print(f"\n第 {q_id} 题：")
        print(f"  背景：{q['background'][:40]}..." if q['background'] else "  背景：(空)")
        print(f"  题目：{q['title'][:40]}..." if q['title'] else "  题目：(空)")
        print(f"  选项：{len(q['options'])} 个")
        print(f"  答案：{q['answer']}")
        
        # 检查是否完整
        is_complete = bool(q['background'] and q['title'] and q['options'] and q['answer'])
        status = "✓ 完整" if is_complete else "✗ 不完整"
        print(f"  状态：{status}")

