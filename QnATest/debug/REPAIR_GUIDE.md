# 题库修复工具使用指南

## 快速开始

### 检查题库中的问题
```bash
python debug/check_and_repair.py --check
```

### 自动修复
```bash
python debug/check_and_repair.py --repair
```

### 验证修复结果
```bash
python debug/check_and_repair.py --verify
```

## 问题分析

### 第17题 - Custom Vision 分类器

**原因**：使用特殊的粗体标题式选项格式
```
**选项 A（方案1）**：添加新图像，然后使用 Smart Labeler 工具
**选项 B（方案2）**：将新图像和对应标签添加到现有模型中，重新训练，然后发布模型
**选项 C（方案3）**：创建一个新模型，然后上传新图像和标签
```

**修复结果**：
- ✓ title: 针对同一场景，以下三种解决方案，哪种能满足需求？
- ✓ options: 3 个
- ✓ answer: B

### 第18题 - Cognitive Search 限速

**原因**：缺少 `**题目**` 标头，选项采用数字方案格式
```
**背景**
你有一个 Azure 认知搜索...

以下三种解决方案，哪种可以减少被限速的可能性？

**选项**
方案 1：迁移到使用更高定价层的认知搜索服务 → 能否解决？
方案 2：添加更多索引（Add indexes）→ 能否解决？
方案 3：启用客户托管密钥（CMK）加密 → 能否解决？
```

**修复结果**：
- ✓ background: 你有一个 Azure 认知搜索...
- ✓ title: 以下三种解决方案，哪种可以减少被限速的可能性？
- ✓ options: 3 个
- ✓ answer: A

## 脚本架构

### QuestionValidator 类
- 扫描 JSON 识别空白题目
- 生成详细报告

### MarkdownParser 类
- 支持标准格式：`A. 选项文本`
- 支持粗体格式：`**选项 A（...）**：`
- 支持方案格式：`方案 1：...`

### RepairEngine 类
- 从 Markdown 提取数据
- 更新 JSON 文件
- 自动创建备份

## 特点

✓ 不修改原有脚本（保持稳定性）  
✓ 自动备份（修复前）  
✓ 幂等操作（可多次运行）  
✓ 支持增量修复  

## 文件

- `data/questions.json` - 已修复的题库
- `data/questions.backup` - 修复前的备份
- `debug/check_and_repair.py` - 修复工具
