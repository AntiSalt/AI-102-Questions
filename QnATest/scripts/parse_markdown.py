#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
将 AI-102_中文题库_1-300.md 解析为 questions.json
"""

import json
import re
from pathlib import Path

def parse_markdown():
    """解析markdown文件并返回题目列表"""
    
    # 路径相对于脚本所在的 scripts/ 目录
    md_file = Path(__file__).parent.parent / "data" / "AI-102_中文题库_1-300.md"
    
    with open(md_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    questions = []
    
    # 按题号分割
    question_pattern = r'## 第 (\d+) 题\n\n(.*?)(?=## 第 \d+ 题|$)'
    matches = re.finditer(question_pattern, content, re.DOTALL)
    
    for match in matches:
        question_num = int(match.group(1))
        question_block = match.group(2)
        
        # 解析背景
        background_match = re.search(r'\*\*背景\*\*\n\n(.*?)\n\n\*\*题目\*\*', question_block, re.DOTALL)
        background = background_match.group(1).strip() if background_match else ""
        
        # 解析题目
        title_match = re.search(r'\*\*题目\*\*\n\n(.*?)\n\n\*\*选项\*\*', question_block, re.DOTALL)
        title = title_match.group(1).strip() if title_match else ""
        
        # 解析选项（[^\n]* 兼容排序题格式：**选项**（排序题，...））
        options_match = re.search(r'\*\*选项\*\*[^\n]*\n\n(.*?)\n\n&nbsp;', question_block, re.DOTALL)
        options_text = options_match.group(1).strip() if options_match else ""
        
        options = parse_options(options_text)
        
        # 解析参考答案
        answer_match = re.search(r'\*\*参考答案：(.*?)\*\*', question_block, re.DOTALL)
        answer = answer_match.group(1).strip() if answer_match else ""
        
        # 解析解析
        explanation_match = re.search(r'\*\*解析：\*\*\n\n(.*?)(?:\n\n> ⚠️|$)', question_block, re.DOTALL)
        explanation = explanation_match.group(1).strip() if explanation_match else ""
        
        # 解析争议说明（如果有）
        controversy_match = re.search(r'> ⚠️ \*\*争议说明\*\*：(.*?)(?=\n\n---|$)', question_block, re.DOTALL)
        controversy = controversy_match.group(1).strip() if controversy_match else ""
        
        # 排序题 answer 格式 "A → B → C" 转为多选题格式 "A、B、C"
        normalized_answer = re.sub(r'\s*→\s*', '、', answer)

        questions.append({
            "id": question_num,
            "background": background,
            "title": title,
            "options": options,
            "answer": normalized_answer,
            "answer_key": normalized_answer,
            "explanation": explanation,
            "controversy": controversy
        })
    
    return questions


def parse_options(options_text):
    """解析选项文本为列表"""
    options = []
    
    # 匹配 A. xxx 的格式
    pattern = r'^([A-Z])\.?\s+(.*?)(?=^[A-Z]\.|$)'
    matches = re.finditer(pattern, options_text, re.MULTILINE | re.DOTALL)
    
    for match in matches:
        label = match.group(1)
        text = match.group(2).strip()
        # 清理多余空白和换行
        text = ' '.join(text.split())
        options.append({
            "label": label,
            "text": text
        })
    
    return options


def main():
    print("开始解析 AI-102_中文题库_1-300.md...")
    questions = parse_markdown()
    
    if not questions:
        print("未找到任何题目！")
        return
    
    print(f"成功解析 {len(questions)} 道题目")
    
    # 保存为JSON
    output_file = Path(__file__).parent.parent / "data" / "questions.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    
    print(f"已保存到 {output_file}")
    
    # 显示第一题作为验证
    if questions:
        print("\n第一题预览：")
        print(f"ID: {questions[0]['id']}")
        print(f"背景: {questions[0]['background'][:100]}...")
        print(f"题目: {questions[0]['title'][:100]}...")
        print(f"选项: {len(questions[0]['options'])} 项")
        print(f"答案: {questions[0]['answer']}")


if __name__ == "__main__":
    main()
