# 📚 AI-102 问答系统

一个功能完整的Web问答学习系统，包含290道Azure AI-102认证考试题库。

## 📁 项目结构

```
QnATest/
├── src/                           # 🌐 Web应用源代码
│   ├── index.html                # 主页面
│   ├── script.js                 # 核心逻辑（支持多选题）
│   └── style.css                 # 样式表（响应式设计）
│
├── data/                          # 📊 数据文件
│   ├── questions.json            # 题库数据（290道题）
│   └── AI-102_中文题库_1-300.md  # 原始题库源文件
│
├── docs/                          # 📖 文档和说明
│   ├── README.md                 # 项目总说明
│   ├── QUICKSTART.md             # 快速开始指南
│   ├── MULTI_SELECT_FIX.md       # 多选题修复说明
│   └── TEST_CHECKLIST.md         # 测试验证清单
│
├── scripts/                       # 🛠️ 工具和脚本
│   └── parse_markdown.py         # Markdown转JSON脚本
│
├── debug/                         # 🔧 调试脚本（可选）
│   ├── check_answers.py          # 答案检查脚本
│   ├── check_duplicates.py       # 重复检查脚本
│   └── debug_parse.py            # 解析调试脚本
│
├── run.py                         # 🚀 启动脚本（推荐使用）
├── .gitignore                     # Git忽略配置
└── PROJECT_STRUCTURE.md           # 本文件
```

## 🚀 快速开始

### 方式1：Python启动脚本（推荐）✨

最简单的启动方式：

```bash
cd "d:\Claude Code\QnATest"
python run.py
```

脚本会自动：
- 在 `src/` 目录启动HTTP服务器
- 打开默认浏览器访问应用
- 显示访问地址和如何停止

### 方式2：手动启动HTTP服务器

```bash
cd "d:\Claude Code\QnATest\src"
python -m http.server 8000
```

然后在浏览器访问：`http://localhost:8000`

### 方式3：直接打开HTML文件

```bash
# Windows
start "d:\Claude Code\QnATest\src\index.html"

# macOS
open "d:\Claude Code\QnATest\src\index.html"

# Linux
xdg-open "d:\Claude Code\QnATest\src\index.html"
```

## 📋 文件说明

### src/ - Web应用源代码
- **index.html** (8.9KB)
  - 应用的主页面
  - 响应式布局，支持桌面、平板、手机
  - 三栏设计（侧边栏、题目区、统计区）

- **script.js** (22KB)
  - 核心应用逻辑
  - 题目加载与显示
  - 单选题/多选题支持
  - LocalStorage数据持久化
  - 进度统计和错题回顾

- **style.css** (14KB)
  - 现代化UI样式
  - 完全响应式设计
  - 深思熟虑的色彩方案
  - 平滑动画效果

### data/ - 数据文件
- **questions.json** (412KB)
  - 结构化题库数据
  - 290道题目（ID、背景、题目、选项、答案、解析、争议说明）
  - 由 `parse_markdown.py` 生成

- **AI-102_中文题库_1-300.md** (346KB)
  - 原始Markdown格式题库
  - 可编辑和修改
  - 修改后运行 `scripts/parse_markdown.py` 重新生成JSON

### docs/ - 文档
- **README.md**
  - 详细的项目说明
  - 功能特性
  - 使用说明

- **QUICKSTART.md**
  - 快速参考指南
  - 常见问题
  - 快捷操作表

- **MULTI_SELECT_FIX.md**
  - 多选题支持的实现细节
  - 修复说明
  - 测试方法

- **TEST_CHECKLIST.md**
  - 完整的测试验证清单
  - 功能测试步骤
  - 问题排查

### scripts/ - 工具脚本
- **parse_markdown.py**
  - 将Markdown题库转换为JSON
  - 使用：`python scripts/parse_markdown.py`
  - 输出到：`data/questions.json`

### debug/ - 调试脚本（可选）
- **check_answers.py** - 检查答案格式
- **check_duplicates.py** - 检查重复答案
- **debug_parse.py** - 调试MD解析过程

> 这些脚本仅在开发调试时需要，日常使用不需要

## ✨ 核心特性

| 特性 | 说明 |
|------|------|
| 📝 **290道题库** | 完整的Azure AI-102考试题库 |
| 🎯 **单/多选支持** | 自动检测题型，支持多个答案 |
| ⚡ **即时反馈** | 提交后立即显示正确/错误和详细解析 |
| 💾 **自动保存** | LocalStorage保存进度，刷新可恢复 |
| 📊 **学习统计** | 实时显示进度、正确率、错题分析 |
| 🔍 **错题回顾** | 专项查看错题，对比答案和解析 |
| 🌐 **全端支持** | 完全响应式，支持所有设备 |
| 🎨 **现代UI** | 精心设计的用户界面和动画效果 |

## 🔄 数据和题库管理

### 修改题库
1. 编辑 `data/AI-102_中文题库_1-300.md`
2. 运行脚本重新生成JSON：
   ```bash
   python scripts/parse_markdown.py
   ```
3. 刷新浏览器（Ctrl+F5）查看新题库

### 查看进度数据
在浏览器控制台（F12）中执行：
```javascript
JSON.parse(localStorage.getItem('ai102_progress'))
```

### 清除所有进度
```javascript
localStorage.removeItem('ai102_progress');
location.reload();
```

## 🛠️ 技术栈

- **前端框架**：纯JavaScript（无依赖）
- **样式**：原生CSS3（响应式）
- **存储**：浏览器LocalStorage
- **兼容性**：现代浏览器（Chrome、Firefox、Safari、Edge）

## 🎯 学习建议

1. **每日坚持** - 建议每天做20-30题，循序渐进
2. **集中复习** - 完成全部290题后，用"错题回顾"功能集中复习
3. **分类学习** - 可按题号范围分阶段学习
4. **模拟考试** - 完成全部题后，计时重做，模拟考试环境

## 📞 故障排除

| 问题 | 解决方案 |
|------|---------|
| 服务器无法启动 | 检查端口8000是否被占用，或修改 `run.py` 中的PORT |
| 题库无法加载 | 确保 `data/questions.json` 存在，或重新运行 `python scripts/parse_markdown.py` |
| 进度丢失 | 检查浏览器是否禁用LocalStorage，或不在隐私模式 |
| 页面显示不正确 | Ctrl+Shift+R（强制刷新）清除浏览器缓存 |

## 📄 许可

本项目供学习和个人使用，题库内容基于Azure AI-102考试题库。

---

**最后更新**：2026-04 | **题库规模**：290道题 | **文件组织**：已优化
