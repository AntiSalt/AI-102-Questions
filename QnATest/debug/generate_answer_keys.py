#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
import re
import shutil
from pathlib import Path

class AnswerKeyGenerator:
    def __init__(self, json_file):
        self.json_file = Path(json_file)
        with open(self.json_file, 'r', encoding='utf-8') as f:
            self.questions = json.load(f)

    def extract_answer_key(self, answer):
        if not answer:
            return ''
        
        # 标准答案
        if re.match(r'^[A-Z、，]+$', answer):
            return answer
        
        # 顺序题：A → B → C
        if '→' in answer:
            letters = re.findall(r'[A-Z]', answer)
            return '、'.join(letters) if letters else ''
        
        # 括号说明：B（1-是，2-否）
        if '（' in answer or '(' in answer:
            match = re.match(r'^([A-Z、，]+)[\（\(]', answer)
            if match:
                return match.group(1)
        
        # 条件答案：B 或 D
        if ' 或 ' in answer or ' / ' in answer:
            letters = re.findall(r'[A-Z]', answer)
            return '、'.join(letters) if letters else ''
        
        letters = re.findall(r'[A-Z]', answer)
        return '、'.join(letters) if letters else ''

    def add_answer_keys(self):
        added = 0
        for q in self.questions:
            answer = q.get('answer', '')
            if answer and 'answer_key' not in q:
                q['answer_key'] = self.extract_answer_key(answer)
                added += 1
        return added

    def save_questions(self):
        with open(self.json_file, 'w', encoding='utf-8') as f:
            json.dump(self.questions, f, ensure_ascii=False, indent=2)

    def backup(self):
        backup_file = self.json_file.with_name(f'{self.json_file.stem}.answer_key_backup')
        shutil.copy(self.json_file, backup_file)
        return backup_file

if __name__ == '__main__':
    json_file = Path('data/questions.json')
    
    if not json_file.exists():
        print(f"错误：找不到 {json_file}")
        exit(1)
    
    print("="*70)
    print("开始生成 answer_key...")
    print("="*70)
    
    gen = AnswerKeyGenerator(json_file)
    
    # 备份
    backup = gen.backup()
    print(f"\n✓ 备份已保存到：{backup}")
    
    # 生成
    added = gen.add_answer_keys()
    print(f"✓ 已为 {added} 个题目添加 answer_key")
    
    # 保存
    gen.save_questions()
    print(f"✓ 已保存到 {json_file}")
    
    print("\n" + "="*70)
    print("✓ 完成！")
    print("="*70)
