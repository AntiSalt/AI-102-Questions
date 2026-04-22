#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json

with open('questions.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

print('=== 检查答案中是否有重复选项 ===\n')

has_duplicate = False
for q in questions:
    answer = q.get('answer', '')
    if '、' in answer:
        # 多选题
        parts = answer.split('、')
        # 检查是否有重复
        if len(parts) != len(set(parts)):
            print(f'题{q["id"]}: 答案={answer}')
            print(f'  重复选项检测到: {parts}')
            print()
            has_duplicate = True

if not has_duplicate:
    print('未发现答案中有重复选项的问题\n')
    
    print('=== 多选题答案示例 ===')
    multi_answers = [q for q in questions if '、' in q.get('answer', '')]
    for q in multi_answers[:10]:
        print(f'题{q["id"]}: {q["answer"]}')
