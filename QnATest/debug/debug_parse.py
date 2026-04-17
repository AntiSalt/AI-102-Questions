#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""DEBUG: 逐步解析MD文件，看第3题和第5题的答案提取过程"""

import re
from pathlib import Path

def debug_parse_specific_questions():
    md_file = Path("AI-102_中文题库_1-300.md")
    
    with open(md_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 分别提取第3题和第5题的块
    question_pattern = r'## 第 (\d+) 题\n\n(.*?)(?=## 第 \d+ 题|$)'
    matches = re.finditer(question_pattern, content, re.DOTALL)
    
    target_questions = {}
    for match in matches:
        question_num = int(match.group(1))
        if question_num in [3, 5]:
            target_questions[question_num] = match.group(2)
    
    # 调试题3
    if 3 in target_questions:
        print('=== 题3 详细分析 ===\n')
        q_block = target_questions[3]
        
        # 查找答案行
        answer_match = re.search(r'\*\*参考答案：(.*?)\*\*', q_block, re.DOTALL)
        if answer_match:
            answer = answer_match.group(1).strip()
            print(f'提取的答案: "{answer}"')
            print(f'答案长度: {len(answer)} 字符')
            print(f'答案的repr: {repr(answer)}')
            print()
        
        # 查找答案之前的内容
        print('答案前100字符的内容:')
        answer_pos = q_block.find('**参考答案：')
        if answer_pos >= 0:
            print(repr(q_block[max(0, answer_pos-50):answer_pos+100]))
        print()
    
    # 调试题5
    if 5 in target_questions:
        print('\n=== 题5 详细分析 ===\n')
        q_block = target_questions[5]
        
        # 查找答案行
        answer_match = re.search(r'\*\*参考答案：(.*?)\*\*', q_block, re.DOTALL)
        if answer_match:
            answer = answer_match.group(1).strip()
            print(f'提取的答案: "{answer}"')
            print(f'答案长度: {len(answer)} 字符')
            print(f'答案的repr: {repr(answer)}')
            print()
        
        # 查找答案之前的内容
        print('答案前100字符的内容:')
        answer_pos = q_block.find('**参考答案：')
        if answer_pos >= 0:
            print(repr(q_block[max(0, answer_pos-50):answer_pos+100]))

if __name__ == "__main__":
    debug_parse_specific_questions()
