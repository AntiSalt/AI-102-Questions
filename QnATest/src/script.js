/**
 * AI-102 问答系统 - 核心应用逻辑
 */

// ============ 全局状态 ============
let questions = [];
let currentQuestionIndex = 0;
let progressData = {
    answers: {},          // { questionId: answer }
    startTime: null,
    lastViewedIndex: 0
};

const STORAGE_KEY = 'ai102_progress';
const MARKS_KEY = 'ai102_marks'; // { questionId: 'star' | 'doubt' | null }

let marksData = {};

// 计时器
let questionStartTime = null;
let questionElapsedSeconds = 0;
let timerInterval = null;
let totalTimeSeconds = 0;     // 累计总用时（秒）
let questionTimes = {};       // { questionId: seconds }

// 随机模式
let shuffleModeActive = false;
let originalQuestions = []; // 保留原始顺序

// 错题练习模式
let reviewModeActive = false;
let reviewQueue = [];       // 本轮错题列表（题目对象数组）
let reviewIndex = 0;        // 当前在 reviewQueue 中的位置
let reviewAnswers = {};     // 本轮错题练习的作答记录

// ============ 初始化 ============
document.addEventListener('DOMContentLoaded', initializeApp);

async function initializeApp() {
    try {
        // 加载题目数据
        await loadQuestions();
        
        // 恢复进度
        loadProgress();
        loadMarks();
        initDarkMode();
        
        // 如果有已保存的进度，显示恢复对话
        if (Object.keys(progressData.answers).length > 0) {
            showProgressDialog();
        } else {
            showMainState();
            loadQuestion(0);
        }
        
        // 绑定事件
        bindEvents();
        
    } catch (error) {
        console.error('初始化失败:', error);
        showError('加载失败，请刷新页面重试');
    }
}

// ============ 数据加载 ============
async function loadQuestions() {
    try {
        const response = await fetch('/data/questions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        questions = await response.json();
        
        if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error('题库数据格式错误或为空');
        }
    } catch (error) {
        console.error('加载题库失败:', error);
        throw new Error('无法加载题库数据，请确保 questions.json 文件存在');
    }
}

function loadProgress() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        progressData = JSON.parse(saved);
        currentQuestionIndex = progressData.lastViewedIndex;
    } else {
        progressData = {
            answers: {},
            startTime: Date.now(),
            lastViewedIndex: 0
        };
    }
}

function saveProgress() {
    progressData.lastViewedIndex = currentQuestionIndex;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
}

// ============ UI 状态管理 ============
function showLoadingState() {
    hideAllStates();
    document.getElementById('loadingState').style.display = 'flex';
}

function showMainState() {
    hideAllStates();
    document.getElementById('mainState').classList.remove('hidden');
}

function showCompletionState() {
    hideAllStates();
    document.getElementById('completionState').classList.remove('hidden');
    updateCompletionStats();
}

function showStatsState() {
    hideAllStates();
    document.getElementById('statsState').classList.remove('hidden');
    updateStatsView();
}

function hideAllStates() {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('mainState').classList.add('hidden');
    document.getElementById('completionState').classList.add('hidden');
    document.getElementById('statsState').classList.add('hidden');
}

// ============ 题目显示 ============
function loadQuestion(index) {
    const activeList = reviewModeActive ? reviewQueue : questions;

    // 边界检查
    if (index >= activeList.length) {
        reviewModeActive ? showReviewCompletion() : showCompletionState();
        return;
    }
    if (index < 0) index = 0;

    if (reviewModeActive) {
        reviewIndex = index;
    } else {
        currentQuestionIndex = index;
    }

    const question = activeList[index];

    // 更新页头
    if (reviewModeActive) {
        document.getElementById('questionNumber').textContent = `错题练习 ${index + 1}/${activeList.length}（第 ${question.id} 题）`;
    } else {
        document.getElementById('questionNumber').textContent = `第 ${question.id} 题`;
    }
    document.getElementById('progressText').textContent = `${index + 1} / ${activeList.length}`;

    const progress = ((index + 1) / activeList.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    // 显示题目内容
    document.getElementById('questionBackground').innerHTML = sanitizeHtml(question.background);
    document.getElementById('questionText').innerHTML = sanitizeHtml(question.title);
    
    // 清空选项
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    // 加载选项
    question.options.forEach((option, idx) => {
        const optionEl = createOptionElement(option, question.id);
        optionsContainer.appendChild(optionEl);
    });
    
    // 隐藏结果区
    document.getElementById('resultSection').classList.add('hidden');
    
    // 重置按钮状态
    document.getElementById('submitBtn').disabled = true;
    document.getElementById('submitBtn').classList.remove('hidden');
    document.getElementById('nextBtn').classList.add('hidden');
    
    // 恢复之前的答案（如果有）
    const savedAnswer = reviewModeActive
        ? reviewAnswers[question.id]
        : progressData.answers[question.id];
    if (savedAnswer) {
        const savedAnswerLabels = savedAnswer.split('、').map(s => s.trim());
        const optionEls = document.querySelectorAll('.option');
        optionEls.forEach(el => {
            if (savedAnswerLabels.includes(el.dataset.label)) {
                el.classList.add('selected');
            }
        });
        document.getElementById('submitBtn').disabled = false;
    }
    
    // 更新侧边栏统计
    updateSidebar();

    // 启动本题计时器
    startQuestionTimer();

    // 更新标记按钮状态
    updateMarkButtons(question.id);

    // 滚动到顶部
    window.scrollTo(0, 0);
}

function createOptionElement(option, questionId) {
    const optionEl = document.createElement('div');
    optionEl.className = 'option';
    optionEl.dataset.label = option.label;
    optionEl.dataset.questionId = questionId;
    
    const labelEl = document.createElement('span');
    labelEl.className = 'option-label';
    labelEl.textContent = option.label;
    
    const textEl = document.createElement('span');
    textEl.className = 'option-text';
    textEl.textContent = option.text;
    
    optionEl.appendChild(labelEl);
    optionEl.appendChild(textEl);
    
    // 点击事件
    optionEl.addEventListener('click', () => selectOption(optionEl));
    
    return optionEl;
}

function selectOption(optionEl) {
    const question = questions[currentQuestionIndex];
    const isMultiSelect = question.answer.includes('、') || question.answer.includes(',');
    
    if (isMultiSelect) {
        // 多选题：允许选择多个选项
        optionEl.classList.toggle('selected');
    } else {
        // 单选题：只能选一个
        document.querySelectorAll('.option').forEach(el => {
            el.classList.remove('selected');
        });
        optionEl.classList.add('selected');
    }
    
    // 只要有选项被选中，就启用提交按钮
    const hasSelected = document.querySelectorAll('.option.selected').length > 0;
    document.getElementById('submitBtn').disabled = !hasSelected;
}

// ============ 答题逻辑 ============
function submitAnswer() {
    const selectedOptions = Array.from(document.querySelectorAll('.option.selected'));
    if (selectedOptions.length === 0) {
        showError('请选择至少一个答案');
        return;
    }
    
    const question = questions[currentQuestionIndex];
    
    // 处理多选题和单选题
    // 使用 answer_key 判断是否为多选题（如果存在），否则使用 answer
    let userAnswer;
    const answerKeyForCompare = question.answer_key || question.answer;
    const isMultiSelect = answerKeyForCompare.includes('、') || answerKeyForCompare.includes(',');
    
    if (isMultiSelect) {
        // 多选题：获取所有选中的选项并排序
        const userAnswerArray = selectedOptions.map(el => el.dataset.label).sort();
        userAnswer = userAnswerArray.join('、');
    } else {
        // 单选题
        userAnswer = selectedOptions[0].dataset.label;
    }
    
    // 记录本题用时
    recordQuestionTime(question.id);

    // 保存答案
    if (reviewModeActive) {
        reviewAnswers[question.id] = userAnswer;
    } else {
        progressData.answers[question.id] = userAnswer;
        saveProgress();
    }
    
    // 判断正错 - 使用 answer_key 进行比较，使用 answer 进行显示
    let isCorrect;
    const correctAnswerForCompare = answerKeyForCompare;  // 用于判断
    const correctAnswerForDisplay = question.answer;      // 用于显示（可能包含说明）

    if (isMultiSelect) {
        // 多选题：排序后比较
        const correctAnswerArray = correctAnswerForCompare.split('、').sort();
        const userAnswerArray = userAnswer.split('、').sort();
        isCorrect = correctAnswerArray.join() === userAnswerArray.join();
    } else {
        // 单选题
        isCorrect = userAnswer === correctAnswerForCompare;
    }

    // 显示结果（第三个参数使用 answer 字段以显示完整说明）
    showResult(question, userAnswer, correctAnswerForDisplay, isCorrect, isMultiSelect);
    
    // 禁用所有选项并高亮显示正确答案（基于 answer_key）
    const correctAnswerLabels = correctAnswerForCompare.split('、').map(s => s.trim());
    document.querySelectorAll('.option').forEach(el => {
        el.disabled = true;
        const label = el.dataset.label;
        
        if (correctAnswerLabels.includes(label)) {
            // 这是正确答案之一
            el.classList.add('correct');
        }
        if (selectedOptions.includes(el) && !isCorrect && !correctAnswerLabels.includes(label)) {
            // 这是用户选中的但错误的选项
            el.classList.add('incorrect');
        }
    });
    
    // 隐藏提交按钮，显示下一题按钮
    document.getElementById('submitBtn').classList.add('hidden');
    document.getElementById('nextBtn').classList.remove('hidden');
}

function showResult(question, userAnswer, correctAnswer, isCorrect, isMultiSelect) {
    const resultSection = document.getElementById('resultSection');
    resultSection.classList.remove('hidden');
    
    // 设置状态
    const statusEl = document.getElementById('resultStatus');
    statusEl.className = 'result-status ' + (isCorrect ? 'correct' : 'incorrect');
    statusEl.textContent = isCorrect ? '✓ 正确！' : '✗ 错误';
    
    // 设置消息
    document.getElementById('resultMessage').textContent = isCorrect 
        ? '恭喜，答案正确！' 
        : '很遗憾，答案错误。';
    
    // 显示用户答案
    const userAnswerLabels = userAnswer.split('、').map(s => s.trim());
    const userAnswerText = userAnswerLabels
        .map(label => {
            const option = question.options.find(o => o.label === label);
            return option ? `${label}. ${option.text}` : label;
        })
        .join('\n');
    document.getElementById('userAnswer').textContent = userAnswerText;
    
    // 显示正确答案
    const correctAnswerLabels = correctAnswer.split('、').map(s => s.trim());
    const correctAnswerText = correctAnswerLabels
        .map(label => {
            const option = question.options.find(o => o.label === label);
            return option ? `${label}. ${sanitizeHtml(option.text)}` : label;
        })
        .join('\n');
    
    const correctAnswerHtml = correctAnswerLabels.length > 1
        ? `<div style="white-space: pre-wrap;">${correctAnswerText}</div>`
        : `<strong>${correctAnswerText}</strong>`;
    
    document.getElementById('correctAnswer').innerHTML = correctAnswerHtml;
    
    // 显示解析
    document.getElementById('explanation').innerHTML = sanitizeHtml(question.explanation);
    
    // 显示争议说明（如果有）
    const controversyBox = document.getElementById('controversyBox');
    if (question.controversy) {
        controversyBox.classList.remove('hidden');
        document.getElementById('controversy').innerHTML = sanitizeHtml(question.controversy);
    } else {
        controversyBox.classList.add('hidden');
    }
    
    // 滚动到结果区
    setTimeout(() => {
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// ============ 题库搜索 ============
function performSearch() {
    const keyword = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultContainer = document.getElementById('searchResults');

    if (!keyword) {
        resultContainer.innerHTML = '';
        return;
    }

    const matched = questions.filter(q => {
        const text = [
            q.title,
            q.background,
            ...q.options.map(o => o.text),
            q.explanation || ''
        ].join(' ').toLowerCase();
        return text.includes(keyword);
    });

    if (matched.length === 0) {
        resultContainer.innerHTML = '<p class="search-empty">未找到匹配题目</p>';
        return;
    }

    resultContainer.innerHTML = matched.slice(0, 20).map(q => {
        const idx = questions.indexOf(q);
        const preview = q.title.length > 50 ? q.title.slice(0, 50) + '…' : q.title;
        return `<div class="search-item" data-index="${idx}">
            <span class="search-item-num">第 ${q.id} 题</span>
            <span class="search-item-text">${preview}</span>
        </div>`;
    }).join('');

    if (matched.length > 20) {
        resultContainer.innerHTML += `<p class="search-empty">还有 ${matched.length - 20} 条结果，请缩小关键词范围</p>`;
    }

    resultContainer.querySelectorAll('.search-item').forEach(el => {
        el.addEventListener('click', () => {
            const idx = parseInt(el.dataset.index);
            showMainState();
            loadQuestion(idx);
            resultContainer.innerHTML = '';
            document.getElementById('searchInput').value = '';
            closeAllPanels();
        });
    });
}

// ============ 进度可视化 ============
function updateProgressMap() {
    const container = document.getElementById('progressMap');
    if (!container) return;
    container.innerHTML = '';

    questions.forEach((q, idx) => {
        const cell = document.createElement('div');
        cell.className = 'progress-cell';
        cell.title = `第 ${q.id} 题`;

        const userAnswer = progressData.answers[q.id];
        if (userAnswer !== undefined) {
            const key = q.answer_key || q.answer;
            const isMulti = key.includes('、') || key.includes(',');
            let isCorrect;
            if (isMulti) {
                isCorrect = key.split('、').map(s=>s.trim()).sort().join() ===
                            userAnswer.split('、').map(s=>s.trim()).sort().join();
            } else {
                isCorrect = userAnswer === key;
            }
            cell.classList.add(isCorrect ? 'cell-correct' : 'cell-incorrect');
        } else {
            cell.classList.add('cell-unanswered');
        }

        if (!reviewModeActive && idx === currentQuestionIndex) {
            cell.classList.add('cell-current');
        }

        if (marksData[q.id] === 'star') cell.classList.add('cell-star');
        else if (marksData[q.id] === 'doubt') cell.classList.add('cell-doubt');

        cell.addEventListener('click', () => {
            if (!reviewModeActive) jumpToQuestion(idx);
        });
        container.appendChild(cell);
    });
}

// ============ 深色模式 ============
function initDarkMode() {
    const saved = localStorage.getItem('ai102_theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('darkModeBtn').textContent = '☀️ 浅色';
    }
}

function toggleDarkMode() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('ai102_theme', 'light');
        document.getElementById('darkModeBtn').textContent = '🌙 深色';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('ai102_theme', 'dark');
        document.getElementById('darkModeBtn').textContent = '☀️ 浅色';
    }
}

// ============ 题目标记 ============
function loadMarks() {
    const saved = localStorage.getItem(MARKS_KEY);
    marksData = saved ? JSON.parse(saved) : {};
}

function saveMarks() {
    localStorage.setItem(MARKS_KEY, JSON.stringify(marksData));
}

function toggleMark(type) {
    const activeList = reviewModeActive ? reviewQueue : questions;
    const question = activeList[reviewModeActive ? reviewIndex : currentQuestionIndex];
    if (!question) return;
    const qId = question.id;
    if (marksData[qId] === type) {
        delete marksData[qId];
    } else {
        marksData[qId] = type;
    }
    saveMarks();
    updateMarkButtons(qId);
    updateSidebar();
}

function updateMarkButtons(questionId) {
    const mark = marksData[questionId];
    const starBtn = document.getElementById('markStarBtn');
    const doubtBtn = document.getElementById('markDoubtBtn');
    starBtn.classList.toggle('active-mode', mark === 'star');
    doubtBtn.classList.toggle('active-mode', mark === 'doubt');
}

// ============ 计时器 ============
function startQuestionTimer() {
    stopQuestionTimer();
    questionStartTime = Date.now();
    questionElapsedSeconds = 0;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        questionElapsedSeconds = Math.floor((Date.now() - questionStartTime) / 1000);
        updateTimerDisplay();
    }, 1000);
}

function stopQuestionTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function recordQuestionTime(questionId) {
    const elapsed = questionStartTime
        ? Math.floor((Date.now() - questionStartTime) / 1000)
        : 0;
    questionTimes[questionId] = elapsed;
    totalTimeSeconds += elapsed;
    stopQuestionTimer();
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function updateTimerDisplay() {
    const el = document.getElementById('questionTimer');
    if (el) el.textContent = formatTime(questionElapsedSeconds);
}

// ============ 进度导出/导入 ============
function exportProgress() {
    const data = JSON.stringify(progressData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai102_progress_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importProgress() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const data = JSON.parse(ev.target.result);
                if (!data.answers || typeof data.answers !== 'object') {
                    showError('文件格式不正确');
                    return;
                }
                progressData = data;
                saveProgress();
                currentQuestionIndex = progressData.lastViewedIndex || 0;
                showMainState();
                loadQuestion(currentQuestionIndex);
                alert(`导入成功！已恢复 ${Object.keys(data.answers).length} 条答题记录。`);
            } catch {
                showError('文件解析失败，请确认是有效的进度文件');
            }
        };
        reader.readAsText(file);
    });
    input.click();
}

// ============ 随机顺序模式 ============
function toggleShuffleMode() {
    if (shuffleModeActive) {
        // 关闭随机模式，恢复原始顺序
        shuffleModeActive = false;
        questions = originalQuestions.slice();
        originalQuestions = [];
        document.getElementById('shuffleModeBtn').textContent = '🔀 随机模式';
        document.getElementById('shuffleModeBtn').classList.remove('active-mode');
    } else {
        // 开启随机模式
        if (originalQuestions.length === 0) {
            originalQuestions = questions.slice();
        }
        shuffleModeActive = true;
        // Fisher-Yates shuffle
        const arr = questions.slice();
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        questions = arr;
        document.getElementById('shuffleModeBtn').textContent = '🔀 随机中…';
        document.getElementById('shuffleModeBtn').classList.add('active-mode');
    }
    currentQuestionIndex = 0;
    showMainState();
    loadQuestion(0);
}

// ============ 错题练习模式 ============
function getErrorQuestions() {
    const errors = [];
    Object.entries(progressData.answers).forEach(([qId, userAnswer]) => {
        const question = questions.find(q => q.id == qId);
        if (!question) return;
        const key = question.answer_key || question.answer;
        const isMulti = key.includes('、') || key.includes(',');
        let isCorrect;
        if (isMulti) {
            isCorrect = key.split('、').map(s=>s.trim()).sort().join() ===
                        userAnswer.split('、').map(s=>s.trim()).sort().join();
        } else {
            isCorrect = userAnswer === key;
        }
        if (!isCorrect) errors.push(question);
    });
    return errors;
}

function startReviewMode() {
    const errors = getErrorQuestions();
    if (errors.length === 0) {
        showError('目前没有错题，继续加油！');
        return;
    }
    reviewModeActive = true;
    reviewQueue = errors;
    reviewIndex = 0;
    reviewAnswers = {};
    showMainState();
    loadQuestion(0);
    // 更新标题提示
    document.getElementById('reviewModeIndicator').classList.remove('hidden');
}

function exitReviewMode() {
    reviewModeActive = false;
    reviewQueue = [];
    reviewIndex = 0;
    reviewAnswers = {};
    document.getElementById('reviewModeIndicator').classList.add('hidden');
    showMainState();
    loadQuestion(currentQuestionIndex);
}

// ============ 导航 ============
function nextQuestion() {
    if (reviewModeActive) {
        if (reviewIndex + 1 >= reviewQueue.length) {
            showReviewCompletion();
        } else {
            reviewIndex++;
            loadQuestion(reviewIndex);
        }
        return;
    }
    if (currentQuestionIndex + 1 >= questions.length) {
        showCompletionState();
    } else {
        loadQuestion(currentQuestionIndex + 1);
    }
}

function previousQuestion() {
    if (reviewModeActive) {
        if (reviewIndex > 0) {
            reviewIndex--;
            loadQuestion(reviewIndex);
        }
        return;
    }
    if (currentQuestionIndex > 0) {
        loadQuestion(currentQuestionIndex - 1);
    }
}

function jumpToQuestion(questionIndex) {
    if (reviewModeActive) return; // 错题模式下禁用跳转
    if (questionIndex >= 0 && questionIndex < questions.length) {
        loadQuestion(questionIndex);
    } else {
        showError('题号无效');
    }
}

function showReviewCompletion() {
    const total = reviewQueue.length;
    let correct = 0;
    Object.entries(reviewAnswers).forEach(([qId, userAnswer]) => {
        const question = questions.find(q => q.id == qId);
        if (!question) return;
        const key = question.answer_key || question.answer;
        const isMulti = key.includes('、') || key.includes(',');
        let isCorrect;
        if (isMulti) {
            isCorrect = key.split('、').map(s=>s.trim()).sort().join() ===
                        userAnswer.split('、').map(s=>s.trim()).sort().join();
        } else {
            isCorrect = userAnswer === key;
        }
        if (isCorrect) correct++;
    });
    const rate = total > 0 ? ((correct / total) * 100).toFixed(1) + '%' : '0%';
    const msg = `错题练习完成！\n\n共练习：${total} 题\n答对：${correct} 题\n答错：${total - correct} 题\n正确率：${rate}\n\n是否退出错题练习模式？`;
    if (confirm(msg)) {
        exitReviewMode();
    } else {
        // 重新开始本轮
        reviewIndex = 0;
        reviewAnswers = {};
        loadQuestion(0);
    }
}

function jumpToErrorQuestion(questionId) {
    // 根据题目ID找到题目索引
    const questionIndex = questions.findIndex(q => q.id === questionId);
    
    if (questionIndex >= 0 && questionIndex < questions.length) {
        // 切换到主答题视图
        showMainState();
        // 加载该题
        loadQuestion(questionIndex);
        // 滚动到顶部
        window.scrollTo(0, 0);
    } else {
        showError('无法找到该题');
    }
}

// ============ 统计与进度 ============
function updateSidebar() {
    const answers = progressData.answers;
    const totalCount = questions.length;
    const answeredCount = Object.keys(answers).length;

    let correctCount = 0;
    Object.entries(answers).forEach(([qId, userAnswer]) => {
        const question = questions.find(q => q.id == qId);
        if (question) {
            // 使用 answer_key 进行判断，不是 answer
            const answerKeyForCompare = question.answer_key || question.answer;
            const isMultiSelect = answerKeyForCompare.includes('、') || answerKeyForCompare.includes(',');

            let isCorrect;
            if (isMultiSelect) {
                const correctAnswerArray = answerKeyForCompare.split('、').map(s => s.trim()).sort();
                const userAnswerArray = userAnswer.split('、').map(s => s.trim()).sort();
                isCorrect = correctAnswerArray.join() === userAnswerArray.join();
            } else {
                isCorrect = userAnswer === answerKeyForCompare;
            }

            if (isCorrect) {
                correctCount++;
            }
        }
    });
    
    const incorrectCount = answeredCount - correctCount;
    const correctRate = answeredCount > 0 
        ? ((correctCount / answeredCount) * 100).toFixed(1) + '%'
        : '-';
    
    document.getElementById('totalCount').textContent = totalCount;
    document.getElementById('answeredCount').textContent = answeredCount;
    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('incorrectCount').textContent = incorrectCount;
    document.getElementById('correctRate').textContent = correctRate;

    const starCount = Object.values(marksData).filter(v => v === 'star').length;
    const doubtCount = Object.values(marksData).filter(v => v === 'doubt').length;
    const starEl = document.getElementById('starCount');
    const doubtEl = document.getElementById('doubtCount');
    if (starEl) starEl.textContent = starCount;
    if (doubtEl) doubtEl.textContent = doubtCount;

    updateProgressMap();
}

function updateCompletionStats() {
    const answers = progressData.answers;
    let correctCount = 0;
    Object.entries(answers).forEach(([qId, userAnswer]) => {
        const question = questions.find(q => q.id == qId);
        if (question) {
            // 使用 answer_key 进行判断，不是 answer
            const answerKeyForCompare = question.answer_key || question.answer;
            const isMultiSelect = answerKeyForCompare.includes('、') || answerKeyForCompare.includes(',');

            let isCorrect;
            if (isMultiSelect) {
                const correctAnswerArray = answerKeyForCompare.split('、').map(s => s.trim()).sort();
                const userAnswerArray = userAnswer.split('、').map(s => s.trim()).sort();
                isCorrect = correctAnswerArray.join() === userAnswerArray.join();
            } else {
                isCorrect = userAnswer === answerKeyForCompare;
            }

            if (isCorrect) {
                correctCount++;
            }
        }
    });
    
    const answeredCount = Object.keys(answers).length;
    const incorrectCount = answeredCount - correctCount;
    const correctRate = answeredCount > 0 
        ? ((correctCount / answeredCount) * 100).toFixed(1) + '%'
        : '0%';
    
    document.getElementById('finalCorrect').textContent = correctCount;
    document.getElementById('finalIncorrect').textContent = incorrectCount;
    document.getElementById('finalRate').textContent = correctRate;
    document.getElementById('finalTotalTime').textContent = formatTime(totalTimeSeconds);
    const avgTime = answeredCount > 0 ? Math.round(totalTimeSeconds / answeredCount) : 0;
    document.getElementById('finalAvgTime').textContent = formatTime(avgTime);
}

function updateStatsView() {
    updateSidebar();
    
    const answers = progressData.answers;
    const totalCount = questions.length;
    const answeredCount = Object.keys(answers).length;
    
    let correctCount = 0;
    const errorQuestions = [];
    
    Object.entries(answers).forEach(([qId, userAnswer]) => {
        const question = questions.find(q => q.id == qId);
        if (question) {
            // 判断是否正确 - 使用 answer_key 进行判断，使用 answer 进行显示
            let isCorrect;
            const answerKeyForCompare = question.answer_key || question.answer;
            const isMultiSelect = answerKeyForCompare.includes('、') || answerKeyForCompare.includes(',');

            if (isMultiSelect) {
                // 多选题：排序后比较
                const correctAnswerArray = answerKeyForCompare.split('、').map(s => s.trim()).sort();
                const userAnswerArray = userAnswer.split('、').map(s => s.trim()).sort();
                isCorrect = correctAnswerArray.join() === userAnswerArray.join();
            } else {
                // 单选题 - 使用 answer_key 进行比较
                isCorrect = userAnswer === answerKeyForCompare;
            }

            if (isCorrect) {
                correctCount++;
            } else {
                errorQuestions.push({
                    id: question.id,
                    userAnswer,
                    correctAnswer: question.answer,  // 显示完整的 answer（含说明）
                    title: question.title
                });
            }
        }
    });
    
    const incorrectCount = answeredCount - correctCount;
    const correctRate = answeredCount > 0 
        ? ((correctCount / answeredCount) * 100).toFixed(1) + '%'
        : '-';
    
    document.getElementById('statsTotalCount').textContent = totalCount;
    document.getElementById('statsAnsweredCount').textContent = answeredCount;
    document.getElementById('statsCorrectCount').textContent = correctCount;
    document.getElementById('statsIncorrectCount').textContent = incorrectCount;
    document.getElementById('statsCorrectRate').textContent = correctRate;
    
    // 显示错题列表
    const errorListContainer = document.getElementById('errorListContainer');
    if (errorQuestions.length > 0) {
        errorListContainer.classList.remove('hidden');
        const errorList = document.getElementById('errorList');
        errorList.innerHTML = '';
        
        errorQuestions.forEach(error => {
            const errorItem = document.createElement('div');
            errorItem.className = 'error-item';
            errorItem.style.cursor = 'pointer';
            
            const question = questions.find(q => q.id === error.id);
            
            // 处理多选和单选的答案显示
            const userAnswerLabels = error.userAnswer.split('、').map(s => s.trim());
            const userAnswerTexts = userAnswerLabels
                .map(label => {
                    const opt = question.options.find(o => o.label === label);
                    return opt ? `${label}. ${opt.text}` : label;
                })
                .join(' / ');
            
            const correctAnswerLabels = error.correctAnswer.split('、').map(s => s.trim());
            const correctAnswerTexts = correctAnswerLabels
                .map(label => {
                    const opt = question.options.find(o => o.label === label);
                    return opt ? `${label}. ${opt.text}` : label;
                })
                .join(' / ');
            
            errorItem.innerHTML = `
                <div class="error-item-title">第 ${error.id} 题</div>
                <div class="error-item-details">
                    <div class="error-detail">
                        <span class="error-detail-label">你的答案</span>
                        <span class="error-detail-value">${userAnswerTexts}</span>
                    </div>
                    <div class="error-detail">
                        <span class="error-detail-label">正确答案</span>
                        <span class="error-detail-value">${correctAnswerTexts}</span>
                    </div>
                </div>
            `;
            
            // 添加点击事件，导航到该错题
            errorItem.addEventListener('click', () => {
                jumpToErrorQuestion(error.id);
            });
            
            errorList.appendChild(errorItem);
        });
    } else {
        errorListContainer.classList.add('hidden');
    }
}

// ============ 浮层面板管理 ============
function openPanel(panelId) {
    // 关闭所有面板，再打开目标面板
    document.querySelectorAll('.float-panel').forEach(p => {
        p.classList.remove('panel-visible');
    });
    document.querySelectorAll('.icon-btn[data-panel]').forEach(b => {
        b.classList.remove('panel-open');
    });

    const panel = document.getElementById(panelId);
    if (panel) panel.classList.add('panel-visible');

    const btn = document.querySelector(`.icon-btn[data-panel="${panelId}"]`);
    if (btn) btn.classList.add('panel-open');
}

function closeAllPanels() {
    document.querySelectorAll('.float-panel').forEach(p => p.classList.remove('panel-visible'));
    document.querySelectorAll('.icon-btn[data-panel]').forEach(b => b.classList.remove('panel-open'));
}

function togglePanel(panelId) {
    const panel = document.getElementById(panelId);
    if (panel && panel.classList.contains('panel-visible')) {
        closeAllPanels();
    } else {
        openPanel(panelId);
    }
}

// ============ 事件绑定 ============
function bindEvents() {
    // 提交和下一题
    document.getElementById('submitBtn').addEventListener('click', submitAnswer);
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);

    // ── 图标栏面板切换 ──
    document.querySelectorAll('.icon-btn[data-panel]').forEach(btn => {
        btn.addEventListener('click', () => togglePanel(btn.dataset.panel));
    });

    // 面板关闭按钮
    document.querySelectorAll('.fp-close').forEach(btn => {
        btn.addEventListener('click', () => closeAllPanels());
    });

    // 点击面板外部关闭
    document.addEventListener('click', (e) => {
        const inPanel  = e.target.closest('.float-panel');
        const inIconBar = e.target.closest('.icon-bar');
        if (!inPanel && !inIconBar) closeAllPanels();
    });

    // ── 统计面板内的操作按钮 ──
    document.getElementById('viewStatsBtn').addEventListener('click', () => {
        closeAllPanels();
        showStatsState();
    });
    document.getElementById('reviewErrorsBtn').addEventListener('click', () => {
        closeAllPanels();
        showStatsState();
        setTimeout(() => document.getElementById('errorListContainer').scrollIntoView({ behavior: 'smooth' }), 100);
    });
    document.getElementById('startReviewModeBtn').addEventListener('click', () => {
        startReviewMode();
        if (reviewModeActive) {
            document.getElementById('startReviewModeBtn').classList.add('hidden');
            document.getElementById('exitReviewModeBtn').classList.remove('hidden');
            closeAllPanels();
        }
    });
    document.getElementById('exitReviewModeBtn').addEventListener('click', () => {
        exitReviewMode();
        document.getElementById('exitReviewModeBtn').classList.add('hidden');
        document.getElementById('startReviewModeBtn').classList.remove('hidden');
        closeAllPanels();
    });
    document.getElementById('shuffleModeBtn').addEventListener('click', toggleShuffleMode);
    document.getElementById('exportBtn').addEventListener('click', exportProgress);
    document.getElementById('importBtn').addEventListener('click', importProgress);
    document.getElementById('restartBtn').addEventListener('click', confirmRestart);

    // ── 图标栏底部：深色模式（不展开面板，直接切换）──
    document.getElementById('darkModeBtn').addEventListener('click', toggleDarkMode);

    // ── 题目标记按钮 ──
    document.getElementById('markStarBtn').addEventListener('click',  () => toggleMark('star'));
    document.getElementById('markDoubtBtn').addEventListener('click', () => toggleMark('doubt'));

    // ── 地图面板：跳转 ──
    document.getElementById('jumpBtn').addEventListener('click', () => {
        const input = document.getElementById('jumpInput');
        const qNum  = parseInt(input.value);
        const qIdx  = qNum - 1;
        if (isNaN(qNum) || qIdx < 0 || qIdx >= questions.length) {
            showError('请输入有效的题号 (1-' + questions.length + ')');
        } else {
            jumpToQuestion(qIdx);
            input.value = '';
            closeAllPanels();
        }
    });
    document.getElementById('jumpInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') document.getElementById('jumpBtn').click();
    });

    // ── 搜索面板 ──
    document.getElementById('searchInput').addEventListener('input', performSearch);

    // ── 键盘快捷键 ──
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (document.getElementById('mainState').classList.contains('hidden')) return;

        const resultVisible = !document.getElementById('resultSection').classList.contains('hidden');
        const numToLabel = { '1': 'A', '2': 'B', '3': 'C', '4': 'D', '5': 'E' };

        if (!resultVisible && numToLabel[e.key]) {
            const optionEl = document.querySelector(`.option[data-label="${numToLabel[e.key]}"]`);
            if (optionEl) { selectOption(optionEl); e.preventDefault(); }
        } else if (e.key === 'Enter') {
            const submitBtn = document.getElementById('submitBtn');
            const nextBtn   = document.getElementById('nextBtn');
            if (!resultVisible && !submitBtn.disabled && !submitBtn.classList.contains('hidden')) {
                submitBtn.click(); e.preventDefault();
            } else if (resultVisible && !nextBtn.classList.contains('hidden')) {
                nextBtn.click(); e.preventDefault();
            }
        } else if (e.key === 'Escape') {
            closeAllPanels();
        }
    });

    // ── 完成页 ──
    document.getElementById('reviewBtn').addEventListener('click', showStatsState);
    document.getElementById('restartAgainBtn').addEventListener('click', confirmRestart);

    // ── 统计视图返回 ──
    document.getElementById('backToQuestionBtn').addEventListener('click', () => {
        showMainState();
        loadQuestion(currentQuestionIndex);
    });
}

// ============ 辅助函数 ============
function sanitizeHtml(html) {
    if (!html) return '';
    
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>');
}

function showError(message) {
    alert(message);
}

function showProgressDialog() {
    const answers = progressData.answers;
    const messageText = `检测到之前的答题记录\n\n已答题数: ${Object.keys(answers).length}\n\n选择继续还是重新开始？`;
    
    const confirmed = confirm(messageText + '\n\n确定（继续）/ 取消（重新开始）');
    if (confirmed) {
        showMainState();
        loadQuestion(currentQuestionIndex);
    } else {
        progressData = {
            answers: {},
            startTime: Date.now(),
            lastViewedIndex: 0
        };
        localStorage.removeItem(STORAGE_KEY);
        showMainState();
        loadQuestion(0);
    }
}

function confirmRestart() {
    const confirmed = confirm('确定要重新开始吗？所有答案将被清除。');
    if (confirmed) {
        progressData = {
            answers: {},
            startTime: Date.now(),
            lastViewedIndex: 0
        };
        localStorage.removeItem(STORAGE_KEY);
        currentQuestionIndex = 0;
        showMainState();
        loadQuestion(0);
    }
}

// ============ 页面卸载时保存进度 ============
window.addEventListener('beforeunload', saveProgress);
