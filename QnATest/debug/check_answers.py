#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""检查questions.json中是否有答案重复的问题"""

import json
from pathlib import Path

def check_answers():
    """检查答案格式和重复"""
    
    json_file = Path("questions.json")
    
    with open(json_file, 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    print("=== 多选题答案检查 ===\n")
    
    multi_answer_questions = []
    
    for q in questions:
        answer = q.get('answer', '')
        # 检查是否是多选题（答案中包含逗号或顿号）
        if '、' in answer or ',' in answer:
            multi_answer_questions.append(q)
            print(f"题{q['id']}: 答案='{answer}' | 长度={len(answer)}")
            
            # 检查是否有重复
            if answer.count('、') > 0:
                parts = answer.split('、')
                print(f"  分解: {parts}")
            
            # 打印原始字符码
            print(f"  字符: {[c for c in answer]}")
            print()
    
    print(f"\n共找到 {len(multi_answer_questions)} 道多选题")
    
    # 具体检查第3、5、9题
    for question_id in [3, 5, 9, 13, 14, 16]:
        q = next((q for q in questions if q['id'] == question_id), None)
        if q:
            print(f"\n详细检查第{question_id}题:")
            print(f"  答案字段: {repr(q['answer'])}")
            print(f"  长度: {len(q['answer'])}")
            print(f"  字节: {q['answer'].encode('utf-8')}")

if __name__ == "__main__":
    check_answers()
