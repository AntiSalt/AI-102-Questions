# Azure AI-102 设计与实现 Microsoft Azure AI 解决方案

> **说明**：本题库基于 AI-102 考试真题改编翻译，题目已乱序排列。
> 部分服务名称（如 QnA Maker、LUIS 等）已被微软更新为新版本（Language Studio、Conversational Language Understanding 等），遇到有争议的题目会在答案后特别说明。

---

## 第 1 题

**背景**

Wide World Importers（WWI）正在开发一个电商平台，该平台面向英语、西班牙语和葡萄牙语客户。WWI 计划构建一个"随时随地购物"项目（Shopping on-the-go project），需要一个可集成到智能音箱的聊天机器人。

要求：
- 回答常见问题
- 支持英语、西班牙语和葡萄牙语交互
- 将现有 FAQ 流程集中管理
- 全体员工可编辑问答对，但只有高级经理（LeadershipTeam 组）可以发布更新

**题目**

你正在为该购物聊天机器人配置 QnA Maker 资源的访问权限。需要为以下两个 Azure AD 组分别分配角色：

- **AllUsers**（全体员工）：可编辑问答对
- **LeadershipTeam**（高级经理）：可发布更新

以下哪个选项正确描述了两个组应被分配的角色？

**选项**

A. AllUsers → QnA Maker Editor；LeadershipTeam → QnA Maker Reader

B. AllUsers → QnA Maker Editor；LeadershipTeam → Contributor

C. AllUsers → Contributor；LeadershipTeam → QnA Maker Editor

D. AllUsers → QnA Maker Reader；LeadershipTeam → Cognitive Services User

&nbsp;

---

**参考答案：B**

**解析：**

- **AllUsers** 需要能创建和修改问答对（编辑权限），应分配 **QnA Maker Editor** 角色。该角色权限包含：创建/更新/替换知识库 API 等。
- **LeadershipTeam** 需要能发布更新，"发布"等同于部署到生产，应分配 **Contributor** 角色（具备除了添加新成员到角色之外的所有权限）。

> ⚠️ **争议说明**：QnA Maker 已在 2025 年 3 月 31 日正式退役，现由 **Azure AI Language 服务中的"自定义问题解答"（Custom question answering）** 替代。对应的角色体系也随之更新（在 Language Studio 中使用 Language Service Contributor 等角色）。若题目场景换为新服务，分配逻辑相似但角色名称不同，请以当前 Azure 文档为准。

---

## 第 2 题

**背景**

一家零售商希望缩短员工记录费用报销收据所花费的时间。所有收据均为英文。你需要从收据中提取顶层信息（如商家名称、交易总额），且解决方案必须**尽量减少开发工作量**。

**题目**

应该使用哪项 Azure 认知服务？

**选项**

A. Custom Vision（自定义视觉）

B. Personalizer（个性化服务）

C. Form Recognizer（表单识别器）

D. Computer Vision（计算机视觉）

&nbsp;

---

**参考答案：C**

**解析：**

Azure Form Recognizer（现已更名为 **Azure AI Document Intelligence**）内置了针对收据的预构建模型（prebuilt receipt model），可以直接提取商家名称、交易日期、总金额等字段，无需自定义训练，开发工作量最小。

Computer Vision 的 OCR 功能可提取文本，但需要额外开发逻辑来解析收据字段，开发量更大。

> ⚠️ **争议说明**：Form Recognizer 已更名为 **Azure AI Document Intelligence**，功能等同，但若考题使用新名称，答案对应选项也应更新。

---

## 第 3 题

**背景**

你正在开发一个使用 Translator API 的方法，该方法将接收网页内容并将其翻译成希腊语（el）。结果中还需包含使用罗马字母（Roman alphabet）的音译（transliteration）。

你已有如下基础 URI：
```
https://api.cognitive.microsofttranslator.com/translate?api-version=3.0
```

**题目**

应在 URI 中额外添加哪三个查询参数（每个正确选项都是解决方案的一部分）？

**选项**

A. `toScript=Cyrl`

B. `from=el`

C. `textType=html`

D. `to=el`

E. `textType=plain`

F. `toScript=Latn`

&nbsp;

---

**参考答案：C、D、F**

**解析：**

- **`to=el`（选项 D）**：必填参数，指定目标输出语言为希腊语。
- **`textType=html`（选项 C）**：可选参数，网页内容为 HTML 格式，需指定文本类型为 html，否则 HTML 标签可能被误翻译。
- **`toScript=Latn`（选项 F）**：可选参数，指定翻译结果使用拉丁（罗马）字母音译，即题目要求的 Roman alphabet。

`toScript=Cyrl` 是西里尔字母，与要求不符。`from=el` 是指定来源语言为希腊语，而题目是要翻译成希腊语，故不需要。

---

## 第 4 题

**背景**

你部署了一个使用 Azure 认知搜索（Azure Cognitive Search）的 Web 应用，用于管理搜索索引。该应用被配置为使用**主管理密钥（primary admin key）**。

在一次安全审查中，你发现有人对搜索索引进行了未授权的更改，怀疑主访问密钥已泄露。

你需要**阻止未经授权的访问**，且解决方案必须**最大程度减少停机时间**。

**题目**

下一步应执行哪项操作？

**选项**

A. 重新生成主管理密钥，将应用切换为使用辅助管理密钥，然后重新生成辅助管理密钥

B. 将应用切换为使用查询密钥，然后重新生成主管理密钥和辅助管理密钥

C. 重新生成辅助管理密钥，将应用切换为使用辅助管理密钥，然后重新生成主管理密钥

D. 添加新的查询密钥，将应用切换为使用该新查询密钥，然后删除所有未使用的查询密钥

&nbsp;

---

**参考答案：C**

**解析：**

目标是在不停机的情况下阻止已泄露的主管理密钥继续被使用：

1. **先重新生成辅助管理密钥**（此时应用仍在用主密钥正常运行，不中断）
2. **将应用切换为使用辅助管理密钥**（应用继续正常运行）
3. **再重新生成主管理密钥**（使旧的泄露密钥失效）

选项 A 的错误在于先重新生成了主密钥（会立即中断应用），然后才切换到辅助密钥，会造成短暂中断。选项 B 中使用查询密钥无法进行索引管理写操作（查询密钥是只读的）。

---

## 第 5 题

**背景**

你正在构建一个多语言聊天机器人，需要根据用户消息的情感（正面或负面）发送不同的回答。

**题目**

应使用哪两个 Text Analytics（文本分析）API？（每个正确答案都是解决方案的一部分）

**选项**

A. 从知名知识库关联实体（Linked entities from a well-known knowledge base）

B. 情感分析（Sentiment Analysis）

C. 关键短语提取（Key Phrases）

D. 语言检测（Detect Language）

E. 命名实体识别（Named Entity Recognition）

&nbsp;

---

**参考答案：B、D**

**解析：**

- **情感分析（B）**：识别用户消息中的正面、负面或中性情感，这是实现"根据情感发送不同回答"的核心能力。
- **语言检测（D）**：由于是多语言聊天机器人，需要先检测用户使用的语言，再选择对应语言模型的情感分析，确保准确性。

关键短语提取和命名实体识别用于提取内容中的关键词和实体，与情感判断无关。

---

## 第 6 题

**背景**

你正在使用 Azure 认知搜索（Azure Cognitive Search）构建一个包含数百万扫描文档（图像和 PDF）的搜索解决方案。你需要让这些扫描文档**尽快**可被搜索。

**题目**

应采用哪种方案？

**选项**

A. 将数据拆分到多个 Blob 容器中，为每个容器创建独立的认知搜索服务，并配置相同的运行时调度模式

B. 将数据拆分到多个 Blob 容器中，为每个容器创建一个索引器，增加搜索单元（Search Units），并配置顺序执行模式

C. 为每种文档类型创建一个单独的认知搜索服务

D. 将数据拆分到多个虚拟文件夹中，为每个文件夹创建一个索引器，增加搜索单元，并配置并行执行模式

&nbsp;

---

**参考答案：D**

**解析：**

要加速大规模索引，核心策略是**并行处理**：

- 将数据拆分到多个虚拟文件夹（或容器）中，每个文件夹对应一个数据源和一个索引器
- 增加搜索单元（每个搜索单元可同时运行一个索引器）
- 配置**并行**执行（而非顺序）

选项 B 错误在于使用了顺序执行，无法并行。选项 A 创建多个搜索服务会增加成本且不必要。正确方式是在同一个搜索服务中增加副本/分区（即搜索单元）来支持并行索引。

---

## 第 7 题

**背景**

Contoso 公司正在开发一个文档处理工作流，用于自动从财务文档（PDF 和 JPEG 图像）中提取信息。技术要求规定：**当 AI 响应的置信度分数低于 70% 时，必须触发人工审核**。

你将收据图像上传到 Form Recognizer API 进行分析，API 返回了包含 `documentResults.fields.MerchantName.confidence` 等字段的 JSON 数据。

**题目**

应使用哪个表达式来触发 Consultant-Bookkeeper 组成员的手动审核？

**选项**

A. `documentResults.docType == "prebuilt:receipt"`

B. `documentResults.fields.*.confidence < 0.7`

C. `documentResults.fields.ReceiptType.confidence > 0.7`

D. `documentResults.fields.MerchantName.confidence < 0.7`

&nbsp;

---

**参考答案：D**

**解析：**

触发人工审核的条件应该是置信度**低于** 0.7（70%），且需要针对具体字段进行判断。选项 D 指定了具体的字段名（MerchantName）并使用了 `< 0.7` 的条件，符合要求。

- 选项 A 只判断文档类型，不涉及置信度
- 选项 B 语法上不规范（`*.confidence` 不是标准 JSON 路径表达式）
- 选项 C 条件是 `> 0.7`（大于），这是置信度高的情况，不应触发审核

---

## 第 8 题

**背景**

你正在构建一个语言理解模型（Language Understanding / LUIS），用于电商聊天机器人。用户可以通过语音或文字输入账单地址。

**题目**

应使用哪种实体类型来捕获账单地址？

**选项**

A. 机器学习实体（Machine Learned）

B. 正则表达式实体（Regex）

C. 列表实体（List）

D. Pattern.any 实体

&nbsp;

---

**参考答案：A**

**解析：**

账单地址由多个子组件组成（门牌号、街道名、城市、邮编、国家），结构复杂且格式灵活（特别是语音输入时），最适合使用**机器学习实体（ML 实体）**。

ML 实体可以由多个子实体组成，例如：
```
地址: 4567 Main Street, NY, 98052, USA
  ├── 门牌号: 4567
  ├── 街道名: Main Street
  ├── 州: NY
  ├── 邮编: 98052
  └── 国家: USA
```

正则表达式适合固定格式（如邮政编码单独提取），但无法处理地址的复杂结构。

> ⚠️ **争议说明**：题目 83（原题库中另一版本）答案为 B（Regex），这是因为该题强调"用户通过语音或文字输入"，有观点认为地址是固定模式的。但考虑到地址的复杂性和多语言特性，ML 实体是微软官方推荐的方式，本题标准答案应为 A。

---

## 第 9 题

**背景**

你有 100 个聊天机器人，每个都有独立的语言理解（Language Understanding / LUIS）模型。你经常需要向每个模型批量添加相同的短语。

你需要通过**编程方式**将新短语更新到所有模型中。

**题目**

在 LUIS SDK 代码中，完成更新操作需要依次调用哪个方法，并使用哪个对象？

从以下选项中选择正确组合：

**选项**

A. 调用 `AddPhraseListAsync`，传入 `PhraselistCreateObject` 对象

B. 调用 `AddEntityAsync`，传入 `EntityCreateObject` 对象

C. 调用 `AddIntentAsync`，传入 `ModelCreateObject` 对象

D. 调用 `AddUtteranceAsync`，传入 `ExampleLabelObject` 对象

&nbsp;

---

**参考答案：A**

**解析：**

LUIS SDK 中，为模型批量添加短语列表（Phrase List Feature）使用的是：

```csharp
var phraselistId = await client.Features.AddPhraseListAsync(appId, versionId, 
    new PhraselistCreateObject
    {
        EnabledForAllModels = false,
        IsExchangeable = true,
        Name = "QuantityPhraselist",
        Phrases = "few,more,extra"
    });
```

短语列表（Phrase List）是 LUIS 中用于提高模型识别能力的特性（Feature），通过 `AddPhraseListAsync` 方法和 `PhraselistCreateObject` 对象完成创建。

---

## 第 10 题

**背景**

你构建了一个聊天机器人（bot1），使用了 Language Understanding（LUIS）资源（lu1）。

你需要确保 bot1 遵循微软负责任 AI 原则中的**包容性（Inclusiveness）**原则。

**题目**

应如何扩展 bot1 来满足该要求？

**选项**

A. 为 bot1 实现身份验证

B. 为 lu1 启用主动学习（Active Learning）

C. 在容器中托管 lu1

D. 为 bot1 添加 Direct Line Speech 频道

&nbsp;

---

**参考答案：D**

**解析：**

微软负责任 AI 的**包容性原则**要求 AI 系统能够赋能所有人，包括有残障需求的用户。为 bot1 添加 **Direct Line Speech** 频道，可以让用户通过语音与机器人交互，从而支持有视觉障碍或行动不便的用户，体现了包容性设计。

Direct Line Speech 是 Bot Framework 提供的端到端语音解决方案，支持"语音输入 → 语音输出"的交互模式。

其他选项（身份验证、主动学习、容器托管）均与包容性原则关系不大。

---

## 第 11 题

**背景**

你正在使用 Azure 认知搜索（Azure Cognitive Search）构建一个知识库，并创建了一个自定义技能（Custom Skill）。该技能调用 Web API，为通过实体识别（Entity Recognition）识别出的每个组织查找其描述。

**题目**

关于该自定义技能，以下说法是否正确？

1. 该技能的输出可以映射到搜索索引的字段中
2. 该技能的定义中使用了 `WebApiSkill` 类型
3. 对于每个已识别的组织，该技能会调用 Web API 并返回该组织的描述（而非其他信息）

请分别判断每条说法是否正确（是/否）：

**选项**

A. 1-是，2-是，3-是

B. 1-是，2-是，3-否

C. 1-否，2-是，3-是

D. 1-是，2-否，3-否

&nbsp;

---

**参考答案：B**

**解析：**

1. **正确**：自定义技能的输出字段可以通过 `outputFieldMappings` 映射到搜索索引的对应字段。
2. **正确**：调用 Web API 的自定义技能在技能集定义中确实使用 `WebApiSkill` 类型（`@odata.type: "#Microsoft.Skills.Custom.WebApiSkill"`）。
3. **错误**：技能会为每个识别到的组织调用 Web API，但返回的是与该技能 `outputs` 定义相关的信息（如组织描述），不一定仅有描述，还可能包含其他实体级别的信息。更准确的说法是"为每个实体识别出的组织调用 API"，而该技能的范围不仅限于组织实体。

---

## 第 12 题

**背景**

你需要构建一个在本地网络中运行、具有间歇性互联网连接的异常检测应用（Anomaly Detector）。解决方案必须**最小化成本**。

**题目**

应使用哪种方案来托管模型？

**选项**

A. Azure Kubernetes Service（AKS）

B. 托管在 Azure Stack Hub 集成系统中的 Kubernetes 集群

C. Azure Container Instances

D. Docker Engine

&nbsp;

---

**参考答案：B**

**解析：**

要求在"本地网络、间歇性互联网连接"的环境中运行模型，应使用 **Azure Stack Hub** 上的 Kubernetes 集群。Azure Stack Hub 是微软的混合云产品，允许将 Azure 服务运行在本地数据中心，适合网络受限场景。

- AKS（选项 A）是完全云端托管，不适合断网环境
- Azure Container Instances（选项 C）也是纯云服务
- Docker Engine（选项 D）技术上可行，但没有 Kubernetes 的编排能力，不是官方推荐方案

> ⚠️ **争议说明**：此题答案可能因考试版本而异。部分资料认为答案为 D（Docker Engine，成本最低），因为题目明确说"最小化成本"。Azure Stack Hub 的成本远高于 Docker Engine。建议结合具体考纲判断，若强调"间歇网络+成本最小"，D 更合理；若强调"生产级可靠性"，B 更合理。

---

## 第 13 题

**背景**

你需要为 Azure 认知搜索（Azure Cognitive Search）实现**表投影（Table Projection）**，以在 Azure 表存储中生成索引数据的物理表示。

**题目**

在技能集（Skillset）定义的 JSON 配置中，`table` 节点必须指定哪三个属性？

**选项**

A. `tableName`

B. `generatedKeyName`

C. `dataSource`

D. `dataSourceConnection`

E. `source`

&nbsp;

---

**参考答案：A、B、E**

**解析：**

定义表投影（Table Projection）时，每个 `table` 节点需要以下三个必填属性：

- **`tableName`**：Azure 存储中的表名
- **`generatedKeyName`**：唯一标识每行的键列名
- **`source`**：来自富化树（enrichment tree）的节点，通常是 Shaper 技能的输出

`dataSource` 和 `dataSourceConnection` 是索引器（indexer）级别的属性，不属于表投影节点的配置。

---

## 第 14 题

**背景**

你正在构建一个聊天机器人，使用 Microsoft Bot Framework SDK。你希望机器人能够支持语音交互。

**题目**

为聊天机器人启用语音功能，应执行哪三项操作？

**选项**

A. 为聊天机器人 App 启用 Web Sockets

B. 创建 Speech 服务资源

C. 注册 Direct Line Speech 频道

D. 注册 Cortana 频道

E. 为聊天机器人 App 启用 CORS

F. 创建 Language Understanding 服务资源

&nbsp;

---

**参考答案：A、B、C**

**解析：**

为机器人启用语音功能需要：

1. **创建 Speech 服务（B）**：提供语音转文字和文字转语音能力
2. **注册 Direct Line Speech 频道（C）**：这是将语音能力与 Bot Framework 集成的官方通道，内部使用文字转语音（TTS）服务
3. **启用 Web Sockets（A）**：Direct Line Speech 通道使用 WebSocket 协议进行实时双向通信

Cortana 频道（D）已被微软逐步淘汰，不推荐使用。CORS（E）用于浏览器跨域请求，与语音功能无关。

---

## 第 15 题

**背景**

你构建了一个零售聊天机器人，使用 QnA Maker 服务，并上传了一份内部支持文档。文档中包含问题"What is your warranty period?"（保修期是多少？）

用户反映，当他们询问"How long is the warranty coverage?"（保修覆盖多长时间？）时，机器人返回了默认的无答案回复。

你需要提高机器人对这两种表达方式的识别准确率。

**题目**

应按顺序执行哪三项操作？

**选项**（排序题，选出正确三项并排序）

A. 向问答对添加替代提问方式（Alternate Questions）

B. 重新训练模型（Retrain the model）

C. 重新发布模型（Republish the model）

D. 删除原有问答对并重新创建

E. 创建新的知识库（Knowledge Base）

&nbsp;

---

**参考答案：A → B → C**

**解析：**

当用户使用不同表达方式提问同一个问题时，正确的做法是：

1. **添加替代提问方式（A）**：为已有问答对添加"How long is the warranty coverage?"作为替代问法，无需删除原有内容
2. **重新训练模型（B）**：保存并训练，以使修改生效
3. **重新发布模型（C）**：发布后，新的问法才能在生产环境生效

删除知识库或创建新知识库代价过大，且无法利用已有训练数据。

> ⚠️ **争议说明**：QnA Maker 已于 2025 年 3 月退役，新服务为 **Azure AI Language 的自定义问题解答（Custom Question Answering）**。操作步骤在 Language Studio 中类似，但界面和部分术语有所不同。

---

## 第 16 题

**背景**

你正在开发一个应用，使用 Face API（人脸识别服务）。该应用需要从员工列表中查找相似人脸。员工人脸列表包含 **60,000 张**图像。

**题目**

在 HTTP 请求体中，应使用哪个列表类型和哪种匹配模式？

**选项**

A. 使用 `faceListId`，模式为 `matchPerson`

B. 使用 `largeFaceListId`，模式为 `matchFace`

C. 使用 `largeFaceListId`，模式为 `matchPerson`

D. 使用 `faceListId`，模式为 `matchFace`

&nbsp;

---

**参考答案：B**

**解析：**

- **列表类型**：`FaceList` 最多支持 1,000 张人脸；`LargeFaceList` 最多支持 1,000,000 张人脸。由于员工列表有 60,000 张图像，必须使用 **`largeFaceListId`**。
- **匹配模式**：
  - `matchPerson`：在满足同一人阈值的前提下查找相似人脸（严格，适合查找同一人的照片）
  - `matchFace`：忽略同一人阈值，直接返回外观最相似的人脸，即使相似度较低也会返回（适合查找"看起来像"的人脸，比如名人相似度查询）
  - 题目要求从员工列表查找"相似人脸"，应使用 `matchFace` 模式

> ⚠️ **争议说明**：Azure Face API 中涉及人脸识别的功能（尤其是面部比对和人员识别）在 2023 年后受到访问限制，需申请审批才能使用。实际项目中请确认访问权限。

---

## 第 17 题

**背景**

你正在开发一个 Custom Vision（自定义视觉）分类器来识别花卉品种。你收到了新花卉品种的图像，需要将这些新图像添加到分类器中。

以下哪种操作能实现目标？

**题目**

针对同一场景，以下三种解决方案，哪种能满足需求？（三选一，每题独立判断）

**选项 A（方案1）**：添加新图像，然后使用 Smart Labeler 工具

**选项 B（方案2）**：将新图像和对应标签添加到现有模型中，重新训练，然后发布模型

**选项 C（方案3）**：创建一个新模型，然后上传新图像和标签

这三种方案分别能否实现目标？

&nbsp;

---

**参考答案：**

- 方案 A：**不能（No）** — Smart Labeler 只能生成标签建议，仍需手动确认并重新训练，单独使用 Smart Labeler 不足以完成更新
- 方案 B：**能（Yes）** — 在现有模型基础上增量添加数据、重训练并发布，是正确的扩展模型方式
- 方案 C：**不能（No）** — 重新创建新模型会丢失现有训练数据，且不符合"将新图像添加到分类器"的要求

**解析：**

扩展已有 Custom Vision 分类器的正确流程是：上传新类别图像 → 添加标签 → 重新训练 → 发布。不应重新创建模型，否则原有 1000+ 张训练图像的数据将丢失。

---

## 第 18 题

**背景**

你有一个 Azure 认知搜索（Cognitive Search）服务，过去 12 个月内查询量持续增长。你发现部分搜索请求正在被**限速（Throttled）**。

以下三种解决方案，哪种可以减少被限速的可能性？（三题独立判断）

**选项**

方案 1：迁移到使用更高定价层的认知搜索服务 → 能否解决？

方案 2：添加更多索引（Add indexes）→ 能否解决？

方案 3：启用客户托管密钥（CMK）加密 → 能否解决？

&nbsp;

---

**参考答案：**

- 方案 1：**能（Yes）** — 更高定价层提供更多副本（replica）和分区（partition），可提升查询吞吐量
- 方案 2：**不能（No）** — 添加索引不会缓解限速，反而可能增加资源负担
- 方案 3：**不能（No）** — CMK 加密是数据安全功能，与性能限速无关，反而会**增加索引大小并降低查询性能**

**解析：**

缓解查询限速的有效方法是增加**副本数（Replicas）**（针对查询限速）或**分区数（Partitions）**（针对索引限速），更高定价层允许配置更多副本和分区。

---

## 第 19 题

**背景**

你正在使用 Computer Vision API 开发一个测试方法，用于检测图像中的公司 Logo。该调用会返回名为 `brands` 的品牌集合。

**题目**

给定以下代码逻辑（伪代码）：

```csharp
// 检查 brands 集合的第一个元素
var firstBrand = brands[0];
// 检查 firstBrand 的 confidence 属性
bool highConfidence = firstBrand.Confidence > 0.9;
// 检查 brands 是否包含多个条目
bool hasMultiple = brands.Count > 1;
```

判断以下说法是否正确：

1. `brands` 集合可能包含多个品牌条目
2. `Confidence` 属性表示检测到品牌的置信度分数
3. `brands[0].Rectangle` 属性可以获取品牌在图像中的位置坐标

**选项**

A. 1-是，2-是，3-是

B. 1-是，2-否，3-否

C. 1-否，2-是，3-否

D. 1-是，2-是，3-否

&nbsp;

---

**参考答案：B（1-是，2-否，3-否）**

**解析：**

Computer Vision 的品牌检测 API 返回的 `brands` 集合：

1. **正确**：一张图像中可以检测到多个品牌，因此集合可以包含多个条目
2. **错误**：Computer Vision 品牌检测结果中的置信度属性名为 `confidence`（小写），且该属性反映的是品牌存在的可信度。注意此 API 中的置信度含义与面部检测不同，需要区分
3. **错误**：品牌位置信息使用的是 `rectangle` 属性（不是 `Rectangle`，且即使有该属性，上面代码也没有测试它的准确性）

> **注意**：此题因为没有具体代码原文，判断存在一定不确定性，实际考试中应参照原始代码截图。

---

## 第 20 题

**背景**

你正在为一个 IoT 工厂监控系统构建解决方案。你从 100 台工业机器上收集传感器数据，每台机器有 50 个不同传感器，每分钟采集一次数据，共有 5,000 个时间序列数据集。你需要识别每个时间序列中的异常值，以预测机械故障。

**题目**

应使用哪项 Azure 认知服务？

**选项**

A. 异常检测器（Anomaly Detector）

B. 认知搜索（Cognitive Search）

C. 表单识别器（Form Recognizer）

D. 自定义视觉（Custom Vision）

&nbsp;

---

**参考答案：A**

**解析：**

**Anomaly Detector（异常检测器）** 专门设计用于时间序列数据的异常检测，支持：
- 单变量异常检测（Univariate）：检测单条时间序列
- 多变量异常检测（Multivariate）：检测多个相关传感器之间的联合异常

对于5,000个时间序列的工厂传感器场景，Anomaly Detector 是最合适的服务，无需自定义 ML 开发。

> 注意：当多个传感器之间存在关联性时（如本题场景），**多变量异常检测（Multivariate Anomaly Detection）** 更能识别跨传感器的复合异常模式（见题目 207）。

---

## 第 21 题

**背景**

你正在构建一个 Azure 认知搜索解决方案，使用以下数据源：

- Finance：本地 Microsoft SQL Server 数据库
- Sales：使用 Core (SQL) API 的 Azure Cosmos DB
- Logs：Azure 表存储
- HR：Azure SQL 数据库

你需要确保可以使用 Azure 认知搜索 REST API **搜索所有数据**。

**题目**

为了满足此要求，应该执行哪项操作？

**选项**

A. 为 Sales 数据配置多个读取副本

B. 将 Finance 数据镜像到 Azure SQL 数据库中

C. 将 Sales 数据迁移到 MongoDB API

D. 将 Logs 数据导入 Azure Sentinel

&nbsp;

---

**参考答案：B**

**解析：**

Azure 认知搜索的索引器（Indexer）支持以下 Azure 数据源：
- Azure Blob Storage / Data Lake Storage
- Azure Table Storage ✅（Logs 支持）
- Azure Cosmos DB ✅（Sales 支持）
- Azure SQL Database ✅（HR 支持）
- Azure VM 上的 SQL Server ✅

**本地 SQL Server 数据库**（Finance）**不在支持列表中**，因此需要将其迁移/镜像到 Azure SQL 数据库，才能被认知搜索索引器访问。

选项 A/C/D 均与解决 Finance 数据的可访问性问题无关。

---

## 第 22 题

**背景**

你正在构建一个多语言聊天机器人，使用 Azure Cognitive Services 语言模型。该机器人频繁回复默认的"Sorry, I don't understand that."（对不起，我不理解你的意思）。

你需要提升机器人的响应能力。

**题目**

应按照哪个顺序执行以下三项操作？

**选项**（排序）

A. 启用主动学习（Enable Active Learning）

B. 训练并重新发布模型（Train and republish the model）

C. 审核并验证建议的语料（Validate the utterances/suggestions）

&nbsp;

---

**参考答案：A → C → B**

**解析：**

主动学习（Active Learning）是 LUIS 的重要功能，可以从用户的真实请求中学习改进：

1. **启用主动学习（A）**：在预测端点 URL 中添加 `log=true` 参数，开始记录用户请求
2. **审核建议的语料（C）**：在 LUIS 门户中查看"Review endpoint utterances"，验证并接受/拒绝系统建议的语料
3. **训练并发布模型（B）**：将审核后的改进训练进模型，重新发布

---

## 第 23 题

**背景**

一个 Azure 认知搜索知识库包含使用 CMK（客户托管密钥）加密的数据。

**题目**

启用 CMK 加密后，哪三项说法是正确的？（每个正确答案都是完整解决方案的一部分）

**选项**

A. 索引大小会增加

B. 查询时间会增加

C. 需要自签名 X.509 证书

D. 索引大小会减少

E. 查询时间会减少

F. 需要 Azure Key Vault

&nbsp;

---

**参考答案：A、B、F**

**解析：**

根据 Microsoft 文档，启用 CMK 加密的三个关键影响：

- **索引大小增加（A）**：加密开销导致存储量增大
- **查询性能降低（B）**（查询时间增加）：加密解密操作增加了每次查询的延迟
- **需要 Azure Key Vault（F）**：CMK 是将密钥存储在 Azure Key Vault 中，而非 Microsoft 管理，Key Vault 是必须要创建的额外资源（且会产生额外费用）

不需要自签名证书（C），Key Vault 使用的是 Azure 的密钥托管机制。

---

## 第 24 题

**背景**

你需要构建一个自然语言处理应用，该应用需要同时访问 **Decision API** 和 **Language API**，且要求通过**单一端点和凭据**访问所有服务。

**题目**

应创建哪种类型的 Azure 资源？

**选项**

A. Language 资源

B. Speech 资源

C. Azure Cognitive Services（多服务资源）

D. Content Moderator 资源

&nbsp;

---

**参考答案：C**

**解析：**

**Azure Cognitive Services 多服务资源**（也称为"全功能资源"）允许通过单一密钥和端点访问多个认知服务，包括 Decision、Language、Speech、Vision 等类别下的所有服务，并统一计费。

单一服务资源（如 Language 资源、Speech 资源）只能访问各自对应的服务，无法同时访问 Decision API 和 Language API。

> **注意**：Azure Cognitive Services 已更名为 **Azure AI Services**，功能相同。

---

## 第 25 题

**背景**

你正在开发一个使用 Custom Vision 构建的移动应用，该模型用于识别零售商品（使用 Retail 领域）。你计划将该模型部署到 Android 手机端（离线使用）。

**题目**

应按顺序执行哪三项操作来准备模型部署？

**选项**（排序）

A. 将模型域（Domain）更改为紧凑型域（Compact domain）

B. 使用紧凑型域重新训练模型（Retrain）

C. 导出模型（Export the model）

D. 删除原有模型

E. 在 Azure Portal 中创建新的 Custom Vision 资源

&nbsp;

---

**参考答案：A → B → C**

**解析：**

要将 Custom Vision 模型部署到移动设备（Android/iOS）离线使用，必须：

1. **更改为紧凑型域（A）**：标准域（General、Retail 等）不可导出；紧凑型域（如 General (compact)、Retail (compact)）专为设备端部署优化
2. **重新训练模型（B）**：更换域后必须重新训练
3. **导出模型（C）**：导出为 TensorFlow、CoreML、ONNX 或 Docker 等格式，用于本地部署

不需要删除原有模型或创建新资源。

---

## 第 26 题

**背景**

Contoso 公司需要为聊天机器人构建 QnA Maker 资源，要求如下：

- Management-Accountants 组：可以**审批**（发布）FAQ
- Consultant-Accountants 组：可以**创建和修改** FAQ
- Agent-CustomerServices 组：可以**浏览**（只读）FAQ

**题目**

应为三个组分别分配哪个 RBAC 角色？

**选项**

A. Management-Accountants→Cognitive Service User；Consultant-Accountants→QnA Maker Editor；Agent-CustomerServices→QnA Maker Reader

B. Management-Accountants→Contributor；Consultant-Accountants→QnA Maker Reader；Agent-CustomerServices→QnA Maker Editor

C. Management-Accountants→QnA Maker Editor；Consultant-Accountants→Cognitive Service User；Agent-CustomerServices→QnA Maker Reader

D. Management-Accountants→QnA Maker Reader；Consultant-Accountants→QnA Maker Editor；Agent-CustomerServices→Cognitive Service User

&nbsp;

---

**参考答案：A**

**解析：**

按照最小权限原则：

| 组 | 需求 | 角色 |
|---|---|---|
| Management-Accountants | 审批/发布 FAQ（拥有发布权限的读写角色） | **Cognitive Service User**（具备发布权限） |
| Consultant-Accountants | 创建和修改 FAQ（编辑权限） | **QnA Maker Editor**（可创建/更新知识库） |
| Agent-CustomerServices | 仅浏览 FAQ（只读） | **QnA Maker Reader**（只能下载/列出知识库） |

> ⚠️ **争议说明**：QnA Maker 已退役，新版"自定义问题解答"角色体系有所变化。建议以 Azure AI Language 文档为准。

---

## 第 27 题

**背景**

你正在开发一个将文本转换为语音的社交媒体扩展程序。解决方案需满足：

- 支持最多 400 个字符的消息
- 为用户提供多种语音选项
- 最小化成本

你已创建了 Azure 认知服务资源（部署在 UK South 区域）。

**题目**

哪个 Speech API 端点可以获取可用的语音列表？

**选项**

A. `https://uksouth.customvoice.api.speech.microsoft.com/api/texttospeech/v3.0/longaudiosynthesis/voices`

B. `https://uksouth.tts.speech.microsoft.com/cognitiveservices/voices/list`

C. `https://uksouth.voice.speech.microsoft.com/cognitiveservices/v1?deploymentId={deployment}`

D. `https://uksouth.api.cognitive.microsoft.com/speechtotext/v3.0/models/base`

&nbsp;

---

**参考答案：B**

**解析：**

获取 Text-to-Speech（TTS）可用语音列表的标准端点格式为：
```
https://{region}.tts.speech.microsoft.com/cognitiveservices/voices/list
```

- 选项 A 是长音频合成（Long Audio Synthesis）的语音列表端点，用于超长文本（超过10分钟），非标准用途
- 选项 B 是标准 TTS 语音列表端点，返回该区域所有可用的标准语音和神经语音
- 选项 C 是自定义神经语音（Custom Neural Voice）的端点
- 选项 D 是语音转文字（STT）基础模型列表端点，功能不符

> ⚠️ **争议说明**：实际考题答案为 C，部分题库存在分歧。请以 Azure Speech Service 官方文档的"List voices"端点为最终依据。

---

## 第 28 题

**背景**

你正在构建一个用于订单查询的聊天机器人，机器人需要引导用户完成产品设置的分步流程。

**题目**

应使用哪种类型的对话（Dialog）来实现分步引导？

**选项**

A. 组件对话（Component Dialog）

B. 瀑布对话（Waterfall Dialog）

C. 自适应对话（Adaptive Dialog）

D. 技能对话（Skill Dialog）

&nbsp;

---

**参考答案：B**

**解析：**

**瀑布对话（Waterfall Dialog）** 专门用于定义一系列有序的步骤（Step），每个步骤完成后自动进入下一步，非常适合引导用户完成有固定流程的任务（如产品设置、表单填写等）。

- 组件对话：用于封装可复用的对话逻辑
- 自适应对话：更灵活，支持事件驱动和条件分支
- 技能对话：用于调用独立部署的技能（Skills）

---

## 第 29 题

**背景**

你正在开发一个监控发动机传感器数据的系统，数据包括转速、角度、温度和压力等多个相关传感器的时间序列数据。系统需要在传感器数据出现异常时生成警报。

**题目**

应在解决方案中使用哪项服务？

**选项**

A. Azure Monitor 中的应用程序洞察（Application Insights）

B. Azure Monitor 中的指标警报（Metric Alerts）

C. 多变量异常检测（Multivariate Anomaly Detection）

D. 单变量异常检测（Univariate Anomaly Detection）

&nbsp;

---

**参考答案：C**

**解析：**

本题的关键是"**多个相关传感器**"。当多个传感器之间存在物理关联性时（如发动机的转速、温度和压力通常是相互关联的），**多变量异常检测（Multivariate）** 能够捕获跨变量的联合异常模式，例如"温度正常但压力低"这种组合异常，而单变量检测无法发现这类问题。

单变量异常检测只能分析单条时间序列，适合独立传感器监测。

---

## 第 30 题

**背景**

你有一个 Azure OpenAI GPT-3.5 模型，你配置了如下系统消息（System Message）：

> "You are an AI assistant that helps people solve mathematical puzzles. Explain your answers as if the request is by a 4-year-old."

**题目**

这是哪种提示工程（Prompt Engineering）技术的示例？

**选项**

A. 少样本学习（Few-shot Learning）

B. 启示（Affordance）

C. 思维链（Chain of Thought）

D. 预设引导（Priming）

&nbsp;

---

**参考答案：D**

**解析：**

**预设引导（Priming）** 是指通过系统消息或初始提示来设定模型的角色、行为方式和输出风格，从而引导后续所有响应的一种提示工程技术。示例中通过系统消息告诉模型"扮演数学谜题助手"并"用4岁孩子能理解的方式解释"，这正是 Priming 的典型用法。

- 少样本学习：通过提供示例（input→output 对）来引导模型输出格式
- 思维链：要求模型逐步推理，通常在提示中加入"Let's think step by step"
- Affordance：利用模型对特定上下文的自然联想

---

## 第 31 题

**背景**

你有一个 Azure OpenAI 聊天机器人。用户反映，机器人在回答知识库范围之外的随意问题时，语气过于随意，缺乏正式感。

以下三种解决方案，哪种能确保机器人对随意问题（spurious questions）提供**正式**回复？

**题目**

方案 A：从 Language Studio 将 chit-chat 源更改为 `qna_chitchat_professional.tsv`，重新训练并重新发布模型

方案 B：从 Language Studio 将 chit-chat 源更改为 `qna_chitchat_friendly.tsv`，重新训练并重新发布模型

方案 C：从 Language Studio 删除所有 chit-chat 问答对，重新训练并重新发布模型

方案 D：从 Language Studio 为问答对添加替代措辞，重新训练并重新发布模型

**选项**

以上四种方案中，哪种能满足"对随意问题提供正式回复"的要求？

A. 方案 A

B. 方案 B

C. 方案 C

D. 方案 D

&nbsp;

---

**参考答案：A**

**解析：**

- **方案 A（正确）**：`qna_chitchat_professional.tsv` 是 Microsoft 提供的预设 chit-chat 数据集，风格为**专业/正式**，适合需要正式语气的场景
- **方案 B（错误）**：`qna_chitchat_friendly.tsv` 是**友好/随意**风格，无法解决语气不够正式的问题
- **方案 C（错误）**：删除所有 chit-chat 配对会使机器人无法处理任何随意问题，用户体验更差
- **方案 D（错误）**：添加替代措辞是针对特定问题的改进，无法系统性地改变整体语气风格

> ⚠️ **争议说明**：多版本考题（226、227、228）显示这些方案的答案均为 B（Not meet the goal），但这里方案 A 使用了 professional 数据集，逻辑上应该是正确的方案。请注意原题中方案 A 的考题标号（#238）参考答案为 A（Yes，meets the goal）。各平台资料对此有分歧，请以 Microsoft Learn 官方文档中 chit-chat personality 的说明为准。

---

## 第 32 题

**背景**

你正在构建一个应用，该应用将：
- 自动为上传的图像建议替代文本（Alt Text）
- 检测不适当的图像并拦截
- 最小化开发工作量

**题目**

应为每项需求分别使用哪个 Computer Vision 端点？

从下列选项匹配：

**选项**

A. 建议 Alt Text → `describeImage` 端点；检测不当图像 → `Content Moderator`

B. 建议 Alt Text → `analyzeImage`（Description 功能）；检测不当图像 → `analyzeImage`（Adult 功能）

C. 建议 Alt Text → `generateThumbnail` 端点；检测不当图像 → `tagImage` 端点

D. 建议 Alt Text → `tagImage` 端点；检测不当图像 → `detectObjects` 端点

&nbsp;

---

**参考答案：B**

**解析：**

Computer Vision 的 `Analyze Image`（图像分析）API 支持多种视觉特性（Visual Features），通过单次调用即可获取：

- **图像描述（Description）**：生成完整句子描述，可用作 Alt Text
- **成人内容检测（Adult）**：返回 `isAdultContent` 和 `isRacyContent` 等属性，用于检测不适当图像

使用同一个 `analyzeImage` 端点（指定不同的 `visualFeatures` 参数）可以同时完成两项需求，最小化开发工作量。

---

## 第 33 题

**背景**

你有一个包含数千张图像的图库，需要将这些图像分类为照片（photograph）、手绘图（drawing）或剪贴画（clipart）。

**题目**

应使用哪个服务端点，以及关注响应中的哪个属性？

**选项**

A. 端点：`Custom Vision / classify`；属性：`predictions[].tagName`

B. 端点：`Computer Vision / analyze`；属性：`imageType.clipArtType`（和 `imageType.lineDrawingType`）

C. 端点：`Computer Vision / tag`；属性：`tags[].name`

D. 端点：`Computer Vision / describe`；属性：`description.captions[].text`

&nbsp;

---

**参考答案：B**

**解析：**

Computer Vision 的 `Analyze Image` API 中，`imageType`（图像类型）特性正是用于区分照片、剪贴画和线条画：

- `imageType.clipArtType`：0=非剪贴画，1=可能是，2=普通剪贴画，3=好的剪贴画
- `imageType.lineDrawingType`：0=非线条画，1=是线条画（手绘图）

此功能无需自定义训练，直接调用即可分类，开发成本最低。Custom Vision 需要自定义训练数据，不符合最小化开发努力的要求。

---

## 第 34 题

**背景**

你正在使用 Azure AI Document Intelligence（前身为 Form Recognizer）开发一个分析医疗文档的应用 App1。你发送请求后收到包含 `confidence` 值的响应。

**题目**

以下关于 Azure AI Document Intelligence 响应的说法，哪项正确？

**选项**

A. `confidence` 值为 0 表示该字段未被识别

B. 响应中的 `boundingBox` 属性描述了字段值在文档中的位置

C. 只有预构建模型（prebuilt model）才会在响应中包含 `confidence` 值

D. 响应中的所有字段都必须具有大于 0.5 的置信度才会返回

&nbsp;

---

**参考答案：B**

**解析：**

Azure AI Document Intelligence 的响应中，`boundingBox`（或新版 API 中的 `polygon`）属性描述了识别到的文本或字段在文档页面上的坐标位置（用于定位显示）。

- 选项 A 错误：`confidence` 为 0 并不意味着未识别，只是置信度极低
- 选项 C 错误：自定义模型同样会返回 `confidence` 值
- 选项 D 错误：API 会返回所有识别到的字段，无论置信度如何，由调用方决定如何处理低置信度结果

---

## 第 35 题

**背景**

你有一个 Azure Cognitive Search 实例，其中 Azure AI 富化管道对社交媒体帖子进行情感分析。你需要定义一个知识存储（Knowledge Store），包含社交媒体帖子和情感分析结果。

**题目**

知识存储的定义中应包含哪两个字段？

**选项**

A. `storageContainer`

B. `tables`

C. `storageConnectionString`

D. `files`

E. `objects`

&nbsp;

---

**参考答案：D、E**

**解析：**

知识存储（Knowledge Store）的 JSON 定义中，`projections` 节点支持三种投影类型：

- `tables`：将数据存储为 Azure 表存储
- **`objects`**（选项 E）：将 JSON 数据以对象形式存储（适合非结构化 JSON 数据，如社交媒体帖子）
- **`files`**（选项 D）：将文件（如图像）存储为 blob（适合情感分析等结果的扩展存储）

`storageConnectionString` 是知识存储顶层节点的属性（而非需要"包含"的字段），`storageContainer` 不是标准属性名。

> ⚠️ **争议说明**：微软文档中知识存储的标准投影类型为 `tables`、`objects`、`files`。但原题答案为 D（files）和 E（objects），这与常规理解略有出入（对于社交媒体帖子通常使用 `objects`；`files` 更多用于图像 blob）。请以官方文档的最新 Knowledge Store 定义为准。

---

## 第 36 题

**背景**

你需要构建一个能够识别公司产品和代码名称的聊天机器人，且解决方案必须**最小化开发工作量**。

**题目**

应使用 Azure Cognitive Service for Language 中的哪项功能？

**选项**

A. 自定义文本分类（Custom Text Classification）

B. 实体链接（Entity Linking）

C. 自定义命名实体识别（Custom NER）

D. 关键短语提取（Key Phrase Extraction）

&nbsp;

---

**参考答案：C**

**解析：**

**自定义命名实体识别（Custom NER）** 允许训练一个专门识别特定领域实体（如公司产品名、内部代码名）的模型，这些名称不在通用 NER 的识别范围内，需要自定义训练。

- 实体链接（B）是将文本中的实体链接到 Wikipedia 等知识库，无法处理内部代码名
- 关键短语提取（D）提取的是通用关键词，不能识别特定实体类型
- 自定义文本分类（A）是将文档分类到预定义类别，功能不符

---

## 第 37 题

**背景**

你正在为 Azure OpenAI 构建一个聊天机器人，该机器人需要回答旅游预订相关的问题。你需要**最大化机器人响应的准确性**。

**题目**

应采取哪项措施？

**选项**

A. 配置模型以包含旅行社数据库中的数据

B. 将模型的 Top P 参数设置为 0

C. 将模型的 Temperature 参数设置为 0

D. 修改模型使用的系统消息，明确要求答案必须准确

&nbsp;

---

**参考答案：A**

**解析：**

要让机器人能够准确回答旅行社特定的预订问题（如特定行程、价格、座位状态），模型必须能够**访问旅行社的最新数据库**。这可以通过 Azure OpenAI 的 "Add your data" 功能（接入 Azure Cognitive Search 索引）来实现。

- 选项 C（Temperature=0）可以使输出更确定性，但若模型没有准确数据，仍然会产生幻觉
- 选项 B/D 可以稍微改善输出质量，但无法替代准确数据的接入
- 选项 A 是根本性解决方案：让模型基于实时/准确数据回答，而非依赖训练时的参数知识

---

## 第 38 题

**背景**

你需要使用 Azure OpenAI 的 embeddings（嵌入）功能，通过**余弦相似度（Cosine Similarity）** 来识别 10,000 个 ASCII 文件中包含特定短语的文件。

**题目**

应使用哪个 Azure OpenAI 模型？

**选项**

A. `text-embedding-ada-002`

B. `GPT-4`

C. `GPT-3.5-Turbo`

D. `GPT-4-32k`

&nbsp;

---

**参考答案：A**

**解析：**

`text-embedding-ada-002` 是专门用于生成文本嵌入（Text Embeddings）的模型，可以将文本转换为高维向量，用于计算余弦相似度来判断文本的语义相似性。这是语义搜索、文档相似度比较的标准做法。

GPT-4 和 GPT-3.5-Turbo 是对话/补全模型（Completion models），不适合用于生成嵌入向量。

> **注意**：2024 年后，微软推出了新版嵌入模型 `text-embedding-3-small` 和 `text-embedding-3-large`，性能优于 `ada-002`，但考题仍以 `ada-002` 作为标准答案。

---

## 第 39 题

**背景**

你需要连接 Azure OpenAI 资源（名为 AI1）并使用 REST API 访问。多个应用（App1、App2、App3）需要各自访问 AI1 中部署的不同 GPT-3.5 模型（每个部署针对不同工作负载优化）。

**题目**

为确保每个应用只能访问 AI1 及其对应的特定部署，每个应用应使用什么信息来连接？

**选项**

A. 端点（Endpoint）+ 密钥（Key）+ 模型名称（Model Name）

B. 部署名称（Deployment Name）+ 端点（Endpoint）+ 密钥（Key）

C. 端点（Endpoint）+ 密钥（Key）+ 模型类型（Model Type）

D. 部署名称（Deployment Name）+ 密钥（Key）+ 模型名称（Model Name）

&nbsp;

---

**参考答案：B**

**解析：**

Azure OpenAI API 的调用需要：

1. **端点（Endpoint）**：如 `https://your-resource.openai.azure.com/`
2. **API 密钥（Key）**：用于身份验证
3. **部署名称（Deployment Name）**：在 Azure OpenAI Studio 中部署模型时指定的名称，用于区分同一资源中的不同模型部署

注意：Azure OpenAI 的 REST API 调用路径中使用的是**部署名称**（而非模型名称），例如：
```
POST /openai/deployments/{deployment-name}/chat/completions
```

---

## 第 40 题

**背景**

你正在构建一个应用，该应用将接收来自法语和德语呼叫者的电话，需要：

- 将来电语音消息捕获为文字（自动转录）
- 按需将消息以英语回放

**题目**

应使用哪些 Azure 认知服务来分别完成这两项任务？

**选项**

A. 文字转录：Speech-to-Text；回放英语：Text-to-Speech

B. 文字转录：Text Analytics（语言检测）；回放英语：Translator

C. 文字转录：Speech-to-Text；回放英语：Translator（翻译后）+ Text-to-Speech（合成语音）

D. 文字转录：Translator；回放英语：Text-to-Speech

&nbsp;

---

**参考答案：C**

**解析：**

两项任务的完整流程：

1. **将法语/德语语音转为文字（转录）**：使用 **Speech-to-Text（语音转文字）** 服务
2. **按需以英语回放（意味着要先翻译再合成语音）**：
   - 使用 **Translator（翻译）** 将法语/德语文本翻译成英语
   - 使用 **Text-to-Speech（文字转语音）** 将英文文本合成为语音播放

选项 A 缺少翻译步骤（只有 TTS 无法将法语直接转为英语语音）。正确答案需要 Speech-to-Text + Translator + Text-to-Speech 三个服务的组合。

---
## 第 41 题

**背景**

你正在开发一个应用，该应用将通过 Azure AI Language 服务处理敏感的客户数据。你需要确保只有特定的 Azure 资源才能访问 Language 服务，且解决方案必须**最小化管理工作量**。

**题目**

应在解决方案中配置什么？

**选项**

A. Azure Application Gateway

B. IPsec 规则

C. 虚拟网络网关（Virtual Network Gateway）

D. 虚拟网络规则（Virtual Network Rules）

&nbsp;

---

**参考答案：D**

**解析：**

**虚拟网络规则（Virtual Network Rules）** 允许你为 Azure AI 服务配置特定的虚拟网络和子网访问许可，只有来自指定虚拟网络的请求才能访问该服务。这是限制特定 Azure 资源访问认知服务的最简单方式，配置简单、管理工作量小。

- Application Gateway 是 Web 应用防火墙/负载均衡器，用于保护 Web 应用而非 AI 服务
- IPsec 规则适用于 VPN 隧道加密，配置复杂
- 虚拟网络网关用于 VPN 或 ExpressRoute 连接，非本题场景

---

## 第 42 题

**背景**

你有一个 Azure AI 搜索 Web 应用，在审查活动日志时发现搜索查询量远超预期，怀疑**查询密钥（Query Key）已泄露**。

你需要在**最大限度减少应用停机时间**的前提下，阻止未授权访问并确保用户仅有只读访问权限。

**题目**

应按顺序执行哪三项操作？

**选项**（排序）

A. 添加一个新的查询密钥

B. 将应用更改为使用新的查询密钥

C. 删除被泄露的旧查询密钥

D. 重新生成所有管理员密钥

E. 禁用 Azure AI Search 资源

&nbsp;

---

**参考答案：A → B → C**

**解析：**

正确的零停机更换流程：

1. **添加新查询密钥（A）**：在 Azure 门户为同一个搜索服务生成一个新的查询密钥，此时两个密钥均有效，应用不中断
2. **切换应用使用新密钥（B）**：更新应用配置（如环境变量、连接字符串），使其使用新密钥进行身份验证
3. **删除旧的泄露密钥（C）**：确认应用正常后，删除被泄露的旧密钥，阻止未授权访问

查询密钥仅有读权限，不涉及管理员密钥；无需禁用整个资源。

---

## 第 43 题

**背景**

你正在构建一个聊天机器人，需要使用 Content Moderator 服务对用户消息进行内容审核。你需要识别消息中包含的**色情/性暗示语言**。

**题目**

应关注 Content Moderator Text Moderation API 响应中的哪个类别得分？

**选项**

A. Category1（成人内容得分）

B. Category2（性暗示内容得分）

C. Category3（侮辱性语言得分）

D. `personalData`（个人数据字段）

&nbsp;

---

**参考答案：B**

**解析：**

Content Moderator 的 Text Moderation API 返回三个类别的得分：

| 类别 | 含义 |
|------|------|
| Category1 | 明确的成人内容（sexually explicit） |
| **Category2** | **性暗示内容（sexually suggestive）** |
| Category3 | 侮辱性/攻击性语言 |

题目要求识别"色情/性暗示"（sexually explicit language），对应 **Category2**（性暗示）或 Category1（明确成人），但性暗示语言最接近 Category2 的定义范围。

> ⚠️ **争议说明**：Content Moderator 已于 2024 年 2 月宣布将在 2027 年退役，建议迁移到 **Azure AI Content Safety**。新服务使用 Hate、Violence、SelfHarm、Sexual 等类别代替原有的三分类体系。

---

## 第 44 题

**背景**

你使用 C# 编写了一个调用 Azure AI Language 关键短语提取（Key Phrase Extraction）API 的函数，并调用时传入字符串：

> "The quick brown fox jumps over the lazy dog"

**题目**

执行关键短语提取后，将输出哪些内容？

**选项**

A. Jumps over the

B. The quick brown fox jumps over the lazy dog

C. quick brown fox, lazy dog

D. The quick

&nbsp;

---

**参考答案：C**

**解析：**

Key Phrase Extraction（关键短语提取）API 会从文本中识别出在语义上最重要的短语，并过滤掉停用词（如 "The"、"over"、"the" 等功能词）。

对于 "The quick brown fox jumps over the lazy dog" 这个句子，提取出的关键短语通常为：
- **quick brown fox**（动作主体描述）
- **lazy dog**（动作对象描述）

注意：
- 返回的是关键短语，而非完整句子
- 停用词（the、over、jumps 等）不会被作为关键词返回
- 关键短语提取结果**没有置信度分数**

---

## 第 45 题

**背景**

你正在构建一个包含 1,000 张扫描手写调查问卷图像的分析方案。这些问卷**没有固定版式**（non-consistent layout），且内容为手写。你使用 Azure AI Document Intelligence 资源（AIdoc1）来提取数据，目标是**最小化开发工作量**。

**题目**

你应将图像上传到哪里，并使用哪种模型类型？

**选项**

A. 上传到：Azure Cosmos DB；模型类型：自定义模板模型（Custom template）

B. 上传到：Azure 存储账户；模型类型：自定义神经模型（Custom neural）

C. 上传到：Azure 存储账户；模型类型：自定义模板模型（Custom template）

D. 上传到：Azure 文件共享；模型类型：预构建 ID 模型（prebuilt-idDocument）

&nbsp;

---

**参考答案：B**

**解析：**

- **上传位置**：Azure AI Document Intelligence 训练数据必须存储在 **Azure 存储账户**（Blob 容器）中，这是训练自定义模型的唯一支持来源
- **模型类型**：
  - **自定义模板模型（Custom template）**：适用于固定版式、结构一致的表单（如标准化发票）
  - **自定义神经模型（Custom neural）**：适用于**版式不固定、包含手写内容**的文档，能处理语义层面的理解而非仅依赖位置特征

由于问卷版式不一致且为手写，应选用 **Custom neural 模型**。

---

## 第 46 题

**背景**

你正在使用 Azure OpenAI Studio 中的 **Completions playground**（GPT-3.5 Turbo 模型）。你有一段代码，需要让模型对代码进行**解释说明**，且解决方案必须**最小化成本**。

**题目**

应该怎么做？

**选项**

A. 将模型更换为 GPT-4-32k

B. 在提示词（Prompt）中添加 `// what does function F do?`

C. 在提示词中添加 `function F(explanation)`

D. 将 Temperature 参数设置为 1

&nbsp;

---

**参考答案：B**

**解析：**

最小化成本意味着**不更换模型**（GPT-4-32k 成本更高）、不增加额外复杂度。

在代码块后直接以注释形式添加问题提示 `// what does function F do?` 是一种低成本且有效的提示工程技巧：
- 代码注释格式自然符合代码上下文
- 模型能理解这是对代码的解释请求
- 不需要增加额外 Token 开销

更改 Temperature 参数不会改变模型的理解能力，只影响输出随机性。更换为 GPT-4-32k 成本大幅增加，不符合"最小化成本"要求。

---

## 第 47 题

**背景**

你在 Azure 中构建了一个使用 Azure OpenAI 模型的聊天机器人。你需要确保机器人能够**阻止试图绕过内置安全功能的问题**（即防止越狱攻击 / Jailbreak）。

**题目**

应实现 Azure AI Content Safety 的哪项功能？

**选项**

A. 受保护材料文本检测（Protected material text detection）

B. 越狱风险检测（Jailbreak risk detection）

C. 在线活动监控（Monitor online activity）

D. 文本内容审核（Moderate text content）

&nbsp;

---

**参考答案：B**

**解析：**

**越狱风险检测（Jailbreak risk detection）** 专门用于识别用户试图通过特殊构造的提示词来绕过 AI 模型安全限制的行为，例如要求模型"扮演没有限制的 AI"等攻击模式。

- 受保护材料检测：检测输出中是否含有受版权保护的内容
- 文本内容审核：检测仇恨、暴力等一般有害内容
- 监控在线活动：用于查看历史日志和趋势分析

---

## 第 48 题

**背景**

你正在构建一个 Azure AI Chat 解决方案，使用 Chat playground（Azure AI Studio）。该聊天机器人需要以**简洁、正式的商务语言**生成文本，同时满足以下要求：

- 降低语言模型的运行成本
- 保持聊天机器人历史窗口（history window）大小不变

**题目**

应配置哪两项设置？

**选项**

A. 系统消息（System message）：指定使用简洁正式语言

B. 最大响应 Token 数（Max response tokens）：降低此值

C. Top P 参数：降低此值

D. Temperature 参数：设置为 0

E. 部署的模型版本：切换为更小的模型（如 GPT-3.5 而非 GPT-4）

&nbsp;

---

**参考答案：A、B**

**解析：**

- **系统消息（A）**：通过在系统提示中明确要求"使用简洁正式的商务语言"，可直接引导模型的输出风格，这是最直接的控制方式
- **降低最大响应 Token 数（B）**：简洁回答意味着每次回复使用的 Token 更少，降低 `max_tokens` 限制可以直接减少每次调用消耗的 Token 数量，从而**降低成本**。同时，历史窗口大小不变，整体上下文消耗保持稳定

更换为小模型（E）虽然也能降低成本，但题目要求在不改变历史窗口大小的前提下降低成本，更换模型属于较大改动且题意不明确允许。

---

## 第 49 题

**背景**

你有一个 Azure AI Search 富化管道（Enrichment Pipeline），其中包含一个**自定义技能（Custom Skill）**，用于对文档执行语言检测和情感分析。

**题目**

Azure AI Search 在索引文档时，会按照什么顺序依次处理各个阶段？（将所有阶段排序）

**选项**（请排序）

A. 文档破解（Document Cracking）——从源格式中提取内容

B. 字段映射（Field Mapping）——将原始字段映射到索引

C. 技能执行（Skill Execution）——执行 AI 富化技能集

D. 输出字段映射（Output Field Mapping）——将富化结果映射到索引字段

E. 索引写入（Index Write）——将数据写入搜索索引

&nbsp;

---

**参考答案：A → B → C → D → E**

**解析：**

Azure AI Search 索引器处理文档的完整顺序：

1. **文档破解（Document Cracking）**：读取源数据（如 Blob 中的 PDF），提取原始文本和元数据
2. **字段映射（Field Mapping）**：将数据源的原始字段映射到索引器的中间表示
3. **技能执行（Skill Execution）**：按技能集定义的顺序执行所有 AI 技能（包括内置技能和自定义技能）
4. **输出字段映射（Output Field Mapping）**：将技能执行产生的富化数据映射到目标索引字段
5. **索引写入（Index Write）**：将所有映射后的数据写入 Azure AI Search 索引

---

## 第 50 题

**背景**

你有一个包含 10,000 个 PDF 文档的训练数据集，文档内容包括扫描的书籍、漫画和杂志。

你正在构建一个解决方案，需要使用 **Language Studio** 训练一个自定义模型，将每个文档分类为书籍、漫画或杂志之一，且解决方案必须**最小化开发工作量**。

**题目**

应使用哪种项目类型？

**选项**

A. 自定义提取模型（Custom extraction model）

B. 多标签分类项目（Multi-label classification project）

C. 自定义命名实体识别项目（Custom NER project）

D. 多标签图像分类模型（Multi-label image classification model）

&nbsp;

---

**参考答案：B**

**解析：**

本题需要将文档**分类为三个类别**（书籍、漫画、杂志）。由于一个文档可能跨多个类别（例如一本图文并茂的漫画书既是书籍也是漫画），使用 **多标签分类（Multi-label classification）** 最为合适。

- 自定义提取模型：用于从文档中抽取特定字段（如日期、金额），不是分类任务
- 自定义 NER：用于识别命名实体，不是文档级分类
- 图像分类模型：本题处理的是 PDF 文本内容，不是图像分类任务

Language Studio 支持在 Azure AI Language 中直接创建和训练文本分类项目，开发工作量最小。

---

## 第 51 题

**背景**

你正在构建一个 Azure AI Search 解决方案，该方案包含一个索引，其中有一个博客文章集合，每篇文章包含 `category`（分类）字段。

你需要对这些文章进行索引，且要求：
- 在搜索结果中包含 `category` 字段的值
- 用户可以对 `category` 字段中的词语进行搜索
- 用户可以基于分类进行下钻过滤（Drill-down filtering / Faceted navigation）

**题目**

应为 `category` 字段配置哪些索引属性？

**选项**

A. Searchable、Facetable、Retrievable

B. Retrievable、Filterable、Sortable

C. Retrievable、Facetable、Key

D. Searchable、Sortable、Retrievable

&nbsp;

---

**参考答案：A**

**解析：**

将三个需求逐一对应：

| 需求 | 所需属性 |
|------|---------|
| 在搜索结果中显示 category 值 | **Retrievable**（可检索/返回） |
| 用户可对 category 字段进行关键词搜索 | **Searchable**（可搜索） |
| 支持基于分类的下钻过滤（分面导航） | **Facetable**（可分面） |

选项 A（Searchable + Facetable + Retrievable）完整涵盖了三个需求。

- Filterable 允许在查询中使用 `$filter`，但不能实现分面导航（Facet）
- Sortable 允许按字段排序，不是本题需求

---

## 第 52 题

**背景**

你正在构建一个应用，需要识别文本消息中实时使用的语言。

**题目**

应使用哪个 SDK 包来检测消息中的语言？

**选项**

A. `Azure.AI.Translation.Text`

B. `Microsoft.CognitiveServices.Speech`

C. `Azure.AI.Translation.Document`

D. `Azure.AI.Translation.Speech`

&nbsp;

---

**参考答案：A**

**解析：**

语言检测（Language Detection）属于 **Azure AI Translator** 服务的功能之一，对应的 NuGet 包为 `Azure.AI.Translation.Text`。

该包提供 `TextTranslationClient`，通过调用 `DetectLanguage` 方法可以识别文本中使用的语言。

- `Microsoft.CognitiveServices.Speech`：用于语音转文字 / 文字转语音，不是文本语言检测
- `Azure.AI.Translation.Document`：用于文档整体翻译（批量文档翻译服务）
- `Azure.AI.Translation.Speech`：不是标准包名

> ⚠️ **争议说明**：语言检测功能同时也存在于 Azure AI Language 服务（`Azure.AI.TextAnalytics` 包）中。题目 344 的场景（社交媒体实时消息语言识别）给出的答案是 **D（Azure AI Language）**，与本题答案不同。两个服务均可检测语言，但 Language 服务在语言检测上的准确率和覆盖语种更全面。请结合具体考题场景判断。

---

## 第 53 题

**背景**

你的博客平台允许用户发布评论，部分评论包含歧视性语言等有害内容。

你需要构建一个**原型解决方案**来检测有害内容，且解决方案必须**最小化开发工作量**。

**题目**

应执行哪两项操作？

**选项**

A. 登录 Content Safety Studio，选择"审核文本内容（Moderate text content）"

B. 从 Azure 门户创建 Azure AI Content Safety 资源

C. 从 Azure 门户创建 Azure OpenAI 资源

D. 登录 Azure AI Foundry，选择"安全 + 安全性"

E. 登录 Content Safety Studio，选择"受保护材料检测"

&nbsp;

---

**参考答案：A、B**

**解析：**

构建有害内容检测原型的最简流程：

1. **创建 Azure AI Content Safety 资源（B）**：这是使用 Content Safety Studio 的前提，需要先在 Azure 门户创建资源
2. **使用 Content Safety Studio 的文本内容审核功能（A）**：该功能可以对输入的文本进行仇恨、暴力、色情、自伤等类别的检测，支持直接粘贴文本进行测试，开发工作量最小

不需要 Azure OpenAI 资源来进行内容审核原型构建。受保护材料检测（E）用于版权保护内容检测，与歧视性语言检测不符。

---

## 第 54 题

**背景**

你有 100,000 张图像，需要构建一个应用来完成以下任务：

- **识别图像中的路标，并提取路标上的文字**
- **分析提取的文字，识别其中提到的知名地点**

解决方案必须**最小化开发工作量**。

**题目**

这两项任务应分别使用什么服务？

**选项**

A. 提取路标文字→Custom Vision；识别知名地点→Azure AI Language NER

B. 提取路标文字→Computer Vision（Read API）；识别知名地点→Azure AI Language（Entity Linking）

C. 提取路标文字→Computer Vision（Read API）；识别知名地点→Azure AI Language（Named Entity Recognition）

D. 提取路标文字→Form Recognizer；识别知名地点→Azure AI Language（Key Phrase Extraction）

&nbsp;

---

**参考答案：C**

**解析：**

- **提取路标文字**：使用 **Computer Vision 的 Read API（OCR）** 从图像中提取文字内容，该 API 专为复杂图像中的文字提取优化
- **识别知名地点**：使用 **Azure AI Language 的命名实体识别（NER）**，识别文本中的地理位置（Location 类别）是 NER 的标准功能，无需自定义训练

注意 NER（C）与实体链接（B）的区别：
- **NER**：识别实体类型（如"这是一个地点"）
- **实体链接（Entity Linking）**：将识别到的实体链接到 Wikipedia 等外部知识库

题目只要求"识别知名地点"，NER 已足够，且开发工作量更小。

---

## 第 55 题

**背景**

你需要为 Azure AI Search 构建一个可以识别**地理位置**的索引方案。

**题目**

应在技能集（Skillset）中包含哪个内置技能？

**选项**

A. Azure OpenAI Embedding Skill

B. Document Extraction Skill（文档提取技能）

C. Entity Linking Skill（实体链接技能）

D. Entity Recognition Skill（实体识别技能）

&nbsp;

---

**参考答案：D**

**解析：**

**Entity Recognition Skill（实体识别技能）** 是 Azure AI Search 的内置技能，可以从文本中识别多种实体类型，包括：
- Person（人物）
- Location（地理位置）✅
- Organization（组织）
- Quantity、DateTime、URL、Email 等

通过将 `categories` 参数设置为 `["Location"]`，可以专门提取地理位置实体。

Entity Linking Skill 用于将实体链接到 Wikipedia，功能更重但不是基础地理位置识别的最简方案。

---

## 第 56 题

**背景**

你正在构建一个产品支持聊天机器人，支持文档存储在多个 PDF 文件中的知识库。解决方案必须**最小化开发工作量和成本**。

**题目**

应在解决方案中使用什么？

**选项**

A. Azure AI Language 对话语言理解（CLU）

B. Azure AI 语言检测

C. Azure AI Language 自定义问题解答（Custom Question Answering）

D. Azure OpenAI

&nbsp;

---

**参考答案：C**

**解析：**

**Azure AI Language 自定义问题解答（Custom Question Answering）** 是专为构建 FAQ 型聊天机器人设计的服务：

- 可以直接上传 PDF 文档作为知识来源，自动提取问答对
- 无需复杂的模型训练
- 提供基于置信度的答案匹配
- 成本和开发工作量均最小

Azure OpenAI（选项 D）虽然功能更强，但配置复杂（需要设置向量数据库、嵌入模型等），成本更高，不符合"最小化"的要求。

---

## 第 57 题

**背景**

你需要构建一个代理（Agent），该代理需要访问**过去 90 天内发布的公开可访问数据**。

你正在使用 Azure AI Agent Service 构建该代理。

**题目**

应在代码中配置哪种工具类型来实现该能力？

**选项**

A. `FileSearchTool`（文件搜索工具）

B. `BingGroundingTool`（Bing 搜索接地工具）

C. `CodeInterpreterTool`（代码解释器工具）

D. `AzureAISearchTool`（Azure AI 搜索工具）

&nbsp;

---

**参考答案：B**

**解析：**

要访问**近期（90天内）公开发布的网络数据**，需要实时网络搜索能力。**BingGroundingTool** 使用 Bing Search API 来检索最新的公开网络内容，可以获取模型训练截止日期之后发布的信息。

- FileSearchTool：用于搜索已上传到代理的文件
- CodeInterpreterTool：用于执行代码和数据分析
- AzureAISearchTool：用于搜索私有的 Azure AI Search 索引，不是实时网络数据

---

## 第 58 题

**背景**

你正在使用 Azure AI Agent Service 构建一个代理，该代理需要使用**函数调用（Function Calling）**，并满足以下要求：

- 所有与指令匹配的函数都必须被触发
- 如果用户未提供必要参数，代理必须主动向用户索要这些参数

你使用 Semantic Kernel 构建该代理。

**题目**

在代码中，应配置哪两个关键设置来满足上述要求？

**选项**

A. `FunctionChoiceBehavior.Auto()`（自动函数选择行为）

B. `FunctionChoiceBehavior.Required()`（强制函数调用行为）

C. `ToolCallBehavior.EnableKernelFunctions`

D. `PromptExecutionSettings.AllowParallelToolCalls = true`

E. `KernelArguments` 中设置 `AutoInvokeKernelFunctions = true`

&nbsp;

---

**参考答案：A、B**

**解析：**

在 Semantic Kernel 中：

- **`FunctionChoiceBehavior.Auto()`**：允许内核自动决定何时调用插件中的函数，当指令与函数匹配时自动触发——满足"所有匹配函数都被触发"的需求
- **`FunctionChoiceBehavior.Required()`**（或配合参数验证）：确保代理在调用函数前验证所有必填参数，若用户未提供则主动请求——满足"向用户索要必要参数"的需求

具体实现中，这两个设置配合使用可以实现完整的函数调用工作流。

---

## 第 59 题

**背景**

你有一个 Azure AI Document Intelligence 资源（AIdoc1，标准 S0 层）。你有以下文件：

- File1：PDF 格式，5 页
- File2：JPEG 格式
- File3：DOCX 格式
- File4：PNG 格式
- File5：BMP 格式

**题目**

你需要**训练一个自定义提取模型**。哪些文件可以上传到 Document Intelligence Studio？

**选项**

A. File1 和 File2 仅

B. File2、File4 和 File5 仅

C. File1、File2 和 File4 仅

D. File1 和 File5 仅

E. File1、File2、File3、File4 和 File5 全部

&nbsp;

---

**参考答案：C**

**解析：**

Azure AI Document Intelligence 自定义模型训练支持的**文件格式**包括：
- **PDF**（文字型或扫描型）✅
- **JPEG / JPG** ✅
- **PNG** ✅
- **TIFF** ✅
- **BMP**：⚠️ 部分版本不支持，通常不在官方列表内

**不支持**的格式：
- **DOCX**（Word 文档）❌

因此，File1（PDF）、File2（JPEG）和 File4（PNG）可以上传；File3（DOCX）不支持；File5（BMP）视具体 API 版本而定，标准上不在支持列表。

> ⚠️ **争议说明**：不同版本 API 对 BMP 的支持状态有所不同，建议以当前 Azure 官方文档为准。

---

## 第 60 题

**背景**

你正在构建一个将用于机动车辆中的文字转语音（Text-to-Speech）应用。你需要**优化合成语音输出的质量**，使其在驾驶环境中更自然清晰。

**题目**

应配置 Speech Synthesis Markup Language（SSML，语音合成标记语言）中的哪个属性？

**选项**

A. `<mstts:express-as>` 元素的 `style` 属性

B. `<emphasis>` 元素的 `level` 属性

C. `<prosody>` 元素的 `pitch` 属性

D. `<voice>` 元素的 `effect` 属性

&nbsp;

---

**参考答案：D**

**解析：**

`<voice>` 元素的 **`effect` 属性** 专门用于针对特定使用场景优化语音输出效果。其中 `effect="eq_car"` 可以优化语音在车内环境的听觉效果（均衡车载音响特性），使合成语音在机动车辆中更清晰自然。

- `style`（A）：用于调整语音情感风格（如开心、悲伤等）
- `level`（B）：用于强调语音中某些词汇的重音
- `pitch`（C）：用于调整音调高低

---

## 第 61 题

**背景**

你正在构建一个多标签文本分类解决方案，聊天机器人需要将用户输入**分类到多个动态类别**中，且这些类别在推理时才被定义（而不是在训练时固定）。

**题目**

应使用哪项服务来对输入进行分类？

**选项**

A. Azure OpenAI 文本摘要（Text Summarization）

B. Azure OpenAI 文本分类（Text Classification）

C. Azure AI Language 自定义命名实体识别（Custom NER）

D. Azure AI Language 自定义文本分类（Custom Text Classification）

&nbsp;

---

**参考答案：D**

**解析：**

**Azure AI Language 自定义文本分类（Custom Text Classification）** 允许在 Language Studio 中定义分类标签并训练模型，支持单标签和多标签分类。对于"类别在推理时定义"的需求，自定义分类通过在系统提示或配置中动态指定类别标签来实现灵活分类。

- Azure OpenAI 文本分类（B）：通过提示词实现零样本（Zero-shot）分类，更灵活，但这里题目指定了使用语言服务
- 自定义 NER（C）：用于实体抽取，不是文档分类任务

> ⚠️ **争议说明**：若题目强调"动态定义类别"和"推理时定义"，Azure OpenAI 的零样本分类可能是更好的答案。但题目明确提到"AI Language 服务"，故选 D。

---

## 第 62 题

**背景**

你需要部署一个 Azure OpenAI 资源，供 App1 使用，且希望确保只有 App1 可以访问该资源中的特定模型部署。

**题目**

为 App1 提供访问权限应使用什么，App1 连接到特定部署时应使用什么？

**选项**

A. 提供访问：API 密钥；连接部署：模型名称

B. 提供访问：Bearer 令牌（Entra ID 身份验证）；连接部署：部署名称

C. 提供访问：API 密钥；连接部署：部署名称

D. 提供访问：Bearer 令牌；连接部署：模型类型

&nbsp;

---

**参考答案：B**

**解析：**

根据微软最佳实践：

- **提供访问**：使用 **Microsoft Entra ID（前 Azure AD）的 Bearer 令牌**（通过托管标识 Managed Identity 获取），可以通过 Azure RBAC 精确控制哪个应用可以访问哪个资源，避免长期有效的 API 密钥泄露风险
- **连接到特定部署**：Azure OpenAI REST API 的路径格式为 `/openai/deployments/{deployment-name}/...`，必须使用**部署名称（Deployment Name）**而非模型名称来指定使用哪个部署

> ⚠️ **争议说明**：在实际使用中，API 密钥（选项 A/C）也是有效的认证方式，操作更简单。但"solution must ensure that only the apps can access"通常暗示需要更安全的 RBAC 控制，微软推荐使用 Entra ID 令牌。选项 B 是微软推荐的安全最佳实践答案。

---

## 第 63 题

**背景**

你有一个 Azure AI Language 资源（Resource1）和存储账户（storage1）。你在 storage1 中创建了 Blob 容器（container1）并上传了示例图像文件。

你需要使用 cURL 命令验证 Resource1 是否能识别**可能含有暴力内容的图像**。

**题目**

cURL 命令中，应使用什么端点和什么内容类型标头？

**选项**

A. 端点：`/contentsafety/image:analyze`；Content-Type：`application/json`

B. 端点：`/contentsafety/text:analyze`；Content-Type：`multipart/form-data`

C. 端点：`/vision/v3.1/analyze`；Content-Type：`application/json`

D. 端点：`/contentsafety/image:analyze`；Content-Type：`multipart/form-data`

&nbsp;

---

**参考答案：A**

**解析：**

Azure AI Content Safety 对图像进行安全审核的 REST API 端点为：
```
POST {endpoint}/contentsafety/image:analyze?api-version=2024-09-01
```

请求体为 JSON 格式，包含图像 URL 或 Base64 编码数据，以及需要检测的类别（如 Violence、Hate、Sexual、SelfHarm），Content-Type 应为 `application/json`。

不应使用 Computer Vision 的 `/vision/v3.1/analyze` 端点，该端点不提供 Content Safety 类别检测。

---

## 第 64 题

**背景**

你需要构建一个应用，该应用将比较多个文档之间的**语义相似性（Semantic Similarity）**，需要返回代表每个文档 Token 的**数值向量**，且解决方案必须**最小化开发工作量**。

**题目**

应使用哪个 Azure OpenAI 模型？

**选项**

A. GPT-3.5

B. Embeddings（如 text-embedding-ada-002）

C. DALL-E

D. GPT-4

&nbsp;

---

**参考答案：B**

**解析：**

**Embeddings（嵌入）模型** 专门用于将文本转换为高维数值向量，这些向量捕获了文本的语义含义。通过计算两个向量之间的余弦相似度，可以衡量文档之间的语义相似性。

- GPT-3.5 / GPT-4 是对话补全模型，不直接输出向量
- DALL-E 是图像生成模型
- 标准嵌入模型（如 `text-embedding-ada-002` 或更新的 `text-embedding-3-small`）直接输出向量，API 简单，开发工作量最小

---

## 第 65 题

**背景**

你有一个 Azure OpenAI 自定义模型，需要为其准备**微调（Fine-tuning）训练数据**，并使用 OpenAI CLI 数据准备工具处理。

你有以下文件：
- File1.tsv
- File2.xml
- File3.pdf
- File4.xlsx

**题目**

哪些文件可以上传到 OpenAI CLI 数据准备工具？

**选项**

A. 仅 File1.tsv

B. 仅 File2.xml

C. 仅 File3.pdf

D. 仅 File4.xlsx

E. File1.tsv 和 File4.xlsx

&nbsp;

---

**参考答案：A**

**解析：**

Azure OpenAI 微调训练数据支持的文件格式为：
- **JSONL**（首选格式，每行一个 JSON 对象）
- **TSV**（制表符分隔）✅

不支持的格式：
- XML ❌
- PDF ❌
- XLSX ❌

OpenAI CLI 数据准备工具（`openai tools fine_tunes.prepare_data`）会自动将 TSV 等格式转换为 JSONL 格式，因此 **File1.tsv** 是唯一可以使用的文件。

---

## 第 66 题

**背景**

你正在开发一个使用 Azure AI Vision 客户端库的应用，需要通过 API 判断图像是**剪贴画（clipart）还是线条画（line drawing）**。

**题目**

在 API 请求中，应使用哪种 HTTP 方法，以及哪个 `visualFeatures` 参数值？

**选项**

A. GET；`description`

B. POST；`imageType`

C. POST；`tags`

D. GET；`objects`

&nbsp;

---

**参考答案：B**

**解析：**

Azure AI Vision 的图像分析（Analyze Image）端点：

- **HTTP 方法**：**POST**（分析包含图像数据或 URL 的请求体时，需使用 POST）
- **visualFeatures 参数**：**`imageType`**（返回 `clipArtType` 和 `lineDrawingType` 两个属性，分别表示剪贴画可能性和线条画可能性）

`description` 返回图像的自然语言描述；`tags` 返回内容标签；`objects` 检测对象位置——均不能区分图像类型。

---

## 第 67 题

**背景**

你正在为 Azure AI Language 服务的自定义问题解答（Custom Question Answering）项目导入问答对。

**题目**

哪两种文件格式可以用于导入？

**选项**

A. Excel

B. TSV

C. JSON

D. LU 文件

E. CSV

&nbsp;

---

**参考答案：B、E**

**解析：**

Azure AI Language 自定义问题解答支持导入以下格式：

- **TSV**（制表符分隔值文件）✅
- **CSV**（逗号分隔值文件）✅
- URL（从 FAQ 网页自动提取）
- PDF/DOCX（自动提取问答对）

Excel（.xlsx）、JSON 和 LU 文件不是该功能的直接导入格式（LU 是 Bot Framework 格式，JSON 需要特定 API 格式）。

---

## 第 68 题

**背景**

你有一个企业产品支持手册，需要构建一个基于该手册的聊天机器人，解决方案必须**最小化开发工作量和成本**。

**题目**

应使用哪种服务？

**选项**

A. Azure AI Phi-3-medium（含微调）

B. Azure AI Language 自定义问题解答（Custom Question Answering）

C. Azure OpenAI GPT-4（含 Azure AI Search 接地数据）

D. Azure AI Document Intelligence

&nbsp;

---

**参考答案：B**

**解析：**

**Azure AI Language 自定义问题解答** 是构建 FAQ 型知识库聊天机器人的最简方案：

- 直接上传支持文档（PDF、URL、TSV 等）
- 自动提取问答对，无需复杂开发
- 提供内置的置信度评分和多轮对话支持
- 成本低（按请求计费，无需 GPU 资源）

相比之下：
- Azure OpenAI GPT-4（C）需要配置 Azure AI Search、向量索引等，开发复杂度和成本更高
- Phi-3 微调（A）需要准备训练数据，成本和时间最高
- Document Intelligence（D）用于文档字段提取，不是问答型聊天机器人

---

## 第 69 题

**背景**

你需要为一个解决方案构建内容管道：需要对 PDF 中的表格数据进行分析，并将相关字段导出到数据库。解决方案中有两种文档类型：

- **内部支出申请授权表单**（Internal expenditure request authorization forms）
- **供应商发票**（Supplier invoices）

解决方案必须**最小化开发工作量**。

**题目**

这两种文档类型应分别使用哪种 Azure AI 服务/模型？

**选项**

A. 授权表单→预构建 Invoice 模型；供应商发票→预构建 Invoice 模型

B. 授权表单→自定义模型；供应商发票→预构建 Invoice 模型

C. 授权表单→预构建 Document 模型；供应商发票→预构建 Layout 模型

D. 授权表单→自定义模型；供应商发票→自定义模型

&nbsp;

---

**参考答案：B**

**解析：**

- **供应商发票**：Azure AI Document Intelligence 提供**预构建发票模型（prebuilt-invoice）**，可以直接提取供应商名称、金额、日期、行项目等标准字段，无需自定义训练，开发工作量最小
- **内部授权表单**：这是公司内部定制的表单，格式因公司而异，没有对应的预构建模型，需要**自定义模型**来识别特定字段

因此，两者结合使用可以在最小化工作量的同时处理两种场景。

---

## 第 70 题

**背景**

你正在开发一个应用，需要对文档中的电话号码和邮箱地址**进行掩码（Masking）处理**，以保护个人隐私信息（PII）。

你使用 Azure AI Language 服务实现此功能。

**题目**

在代码中应调用哪个 API 方法，并传入哪个参数来实现 PII 遮蔽？

**选项**

A. `RecognizeEntities`，设置 `piiCategories = ["PhoneNumber", "Email"]`

B. `RecognizePiiEntities`，设置 `domainFilter = "phi"`

C. `RecognizePiiEntities`，不设置额外参数（默认识别所有 PII 类型）

D. `AnalyzeSentiment`，设置 `showOpinionMining = true`

&nbsp;

---

**参考答案：C**

**解析：**

Azure AI Language 的 **PII 识别（RecognizePiiEntities）** API 专门用于识别文档中的个人可识别信息（如电话号码、邮箱、姓名、证件号等），并在响应中返回遮蔽后的文本（`redactedText`）。

默认情况下，该 API 会识别所有支持的 PII 类别，包括 PhoneNumber 和 Email。`domainFilter = "phi"` 是用于医疗健康信息（Protected Health Information）过滤的特定参数。

`RecognizeEntities` 是通用实体识别，不提供 PII 遮蔽功能。

---

## 第 71 题

**背景**

你正在使用 Azure AI Agent Service 构建一个代理，需要确保代理能访问近期（过去 90 天内）公开发布的数据。

**题目**

在使用 Azure AI Foundry Agent Service 构建代理的代码中，应如何完成工具配置？

**选项**

A. 使用 `FileSearchTool`，并指定文件 ID

B. 使用 `BingGroundingTool`，配置 Bing Search API 连接

C. 使用 `CodeInterpreterTool`，并上传本地数据文件

D. 使用 `AzureAISearchTool`，连接到一个已索引的知识库

&nbsp;

---

**参考答案：B**

**解析：**

**BingGroundingTool** 通过 Bing Search API 使代理能够访问实时的公开网络数据，包括 90 天内发布的新闻、文章和更新。这是 Azure AI Foundry Agent Service 中接入实时互联网数据的标准工具。

在代码中，通常通过 Bing Search 连接资源（Connection）来配置此工具：

```python
bing_tool = BingGroundingTool(connection_id=bing_connection.id)
```

其他选项（FileSearch、CodeInterpreter、AzureAISearch）均只能访问预先准备好的静态数据，无法获取近期公开发布的新内容。

---

## 第 72 题

**背景**

你有 100,000 张图像，需要构建一个应用，完成以下任务：

- **识别图像中的路标，并生成每个路标的简短描述**
- **分析这些描述，生成关于不同类型路标及其出现频率的报告**

解决方案必须**最小化成本**。

**题目**

这两个任务应分别使用什么服务？

**选项**

A. 生成路标描述→Custom Vision；生成报告→Azure AI Language

B. 生成路标描述→Computer Vision（Image Analysis / Description 功能）；生成报告→Azure AI Language（Key Phrase Extraction）

C. 生成路标描述→Computer Vision（Read API）；生成报告→Azure OpenAI

D. 生成路标描述→Azure AI Content Understanding；生成报告→Azure AI Language（Key Phrase Extraction）

&nbsp;

---

**参考答案：B**

**解析：**

- **生成路标描述**：使用 **Computer Vision Image Analysis** 中的 `Description` 功能（`visualFeatures=Description`），可以为图像生成自然语言描述，无需自定义训练，成本低
- **生成报告（统计分析）**：使用 **Azure AI Language 关键短语提取（Key Phrase Extraction）** 分析描述文本，提取路标类型关键词，然后统计频率生成报告；Language 服务比 Azure OpenAI 成本更低

使用 Azure OpenAI 虽然功能更强，但成本更高，不符合"最小化成本"的要求。

---

## 第 73 题

**背景**

你正在构建一个文字转语音（Text-to-Speech）应用，使用**自定义神经语音（Custom Neural Voice）**。

你需要创建一个 SSML 文件，要求语音配置满足：
- 表达**平静的语调**
- 模仿**年轻成年女性的声音**

**题目**

应在 SSML 代码中配置哪两个关键元素/属性？

**选项**

A. 使用 `<voice name="young-adult-female">`；在 `<mstts:express-as style="calm">` 中包裹文本

B. 使用 `<prosody pitch="-10%">`；使用 `<voice gender="female">`

C. 使用 `<emphasis level="reduced">`；使用 `<voice age="25">`

D. 使用 `<mstts:express-as style="calm">`；选择 `ShimmerNeural`（或其他年轻女性神经语音）

&nbsp;

---

**参考答案：A / D（取决于实现方式）**

**解析：**

要实现"平静语调 + 年轻成年女性声音"：

1. **声音选择**：在 `<voice>` 标签中指定具有年轻女性特征的神经语音（如 `en-US-AriaNeural`、`en-US-JennyNeural` 等），这些语音经过训练以模仿特定年龄性别的声音
2. **风格调整**：使用 SSML 的 `<mstts:express-as style="calm">` 标签设置平静（calm）情感风格

完整 SSML 示例：
```xml
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis"
       xmlns:mstts="http://www.w3.org/2001/mstts" xml:lang="en-US">
  <voice name="en-US-AriaNeural">
    <mstts:express-as style="calm">
      Your text here.
    </mstts:express-as>
  </voice>
</speak>
```

---

## 第 74 题

**背景**

你有一个 Azure AI Search 解决方案，需要在其中添加一个**自定义技能**，使其能够通过 Azure AI Document Intelligence 识别并从发票中提取属性，供 App1 使用。

**题目**

应在解决方案中包含哪个服务？

**选项**

A. Azure OpenAI

B. Azure AI Immersive Reader

C. Azure AI Document Intelligence

D. Azure Custom Vision

&nbsp;

---

**参考答案：C**

**解析：**

**Azure AI Document Intelligence（前 Form Recognizer）** 提供预构建的发票模型（prebuilt-invoice），可以提取发票中的结构化字段（如供应商、金额、日期、行项目等）。

在 Azure AI Search 的富化管道中，可以将 Document Intelligence 封装为**自定义技能（Custom Skill）**，通过 Web API 接口调用，将发票字段提取结果添加到搜索索引中。

Immersive Reader 用于提高阅读可访问性；Custom Vision 用于图像分类/对象检测，不适合结构化文档字段提取。

---

## 第 75 题

**背景**

你有 1,000 段视频文件，需要对视频进行**情感分析**，使用 Azure AI Content Understanding 项目。解决方案必须**最小化开发工作量**。

**题目**

应使用哪种项目模板？

**选项**

A. 视频镜头分析（Video shot analysis）

B. 媒体资产管理（Media asset management）

C. 广告分析（Advertising）

&nbsp;

---

**参考答案：B**

**解析：**

**媒体资产管理（Media asset management）** 模板是 Azure AI Content Understanding 中用于对视频内容进行全面分析的模板，包括：
- 情感分析
- 关键帧提取
- 语音转文字
- 内容标签生成

它提供了对视频媒体资产进行端到端理解的能力，适合大量视频文件的批量分析场景，开发工作量最小。

- 视频镜头分析：专注于视频镜头的切换检测和分析
- 广告分析：针对广告内容的品牌和产品识别

---

## 第 76 题

**背景**

你有一个 Azure AI Search 资源（AlSearch1），其索引包含一个向量字段。

你需要：
- 使用 Azure AI Agent Service 部署一个新代理
- 将 AlSearch1 索引连接到该代理
- 验证索引与代理的集成

**题目**

应按顺序执行哪四项操作？

**选项**（排序）

A. 在 Azure AI Foundry 中创建新项目

B. 在项目中创建一个代理，配置 AzureAISearchTool 工具

C. 为 AlSearch1 创建一个连接（Connection）

D. 测试代理，向代理发送涉及 AlSearch1 索引数据的查询

E. 将 AlSearch1 的 API 密钥添加到 Azure Key Vault

&nbsp;

---

**参考答案：A → C → B → D**

**解析：**

部署并验证 AI Agent 与 Azure AI Search 集成的完整流程：

1. **在 Azure AI Foundry 中创建新项目（A）**：Azure AI Agent Service 运行在 AI Foundry 项目中
2. **创建 AlSearch1 的连接（C）**：在 AI Foundry 项目中配置与 Azure AI Search 资源的连接，提供端点和 API 密钥
3. **创建代理并配置 AzureAISearchTool（B）**：使用已创建的连接初始化搜索工具，并将其添加到代理的工具列表中
4. **测试代理（D）**：发送测试查询验证代理能否正确检索 Search 索引中的数据

---

## 第 77 题

**背景**

你有一个 Azure AI 搜索（Azure AI Search）资源（Search1）和一个使用它进行内容索引的应用（App1）。

你需要确保 Search1 的安全，满足以下要求：
- 防止来自互联网的直接访问
- 限制每个应用只能执行特定查询

**题目**

应分别采取什么措施来满足这两个需求？

**选项**

A. 防止互联网访问→配置 IP 防火墙规则；限制查询→创建独立的查询密钥

B. 防止互联网访问→部署私有端点（Private Endpoint）；限制查询→创建独立的查询密钥

C. 防止互联网访问→配置网络安全组（NSG）；限制查询→使用 Azure AD 条件访问

D. 防止互联网访问→部署私有端点；限制查询→配置 Azure RBAC 角色

&nbsp;

---

**参考答案：B**

**解析：**

- **防止互联网访问**：为 Azure AI Search 创建**私有端点（Private Endpoint）**，使其只在虚拟网络内可访问，完全阻断公共互联网流量
- **限制每个应用的查询范围**：为不同应用创建独立的**查询密钥（Query Keys）**，不同密钥可以通过索引级别权限控制各应用能访问哪些文档/字段

虽然 IP 防火墙规则也可以限制访问，但私有端点提供更彻底的网络隔离。RBAC 角色控制的是管理层面的权限，不能精确限制查询内容。

---

## 第 78 题

**背景**

你正在构建一个处理来自法语和德语来电的通话处理系统。系统必须：

- 将来电语音消息捕获为文字（自动转录，保留原始语言）
- 按需将消息以**英语**回放

**题目**

应使用哪些 Azure 认知服务来完成这两项任务？

**选项**

A. 捕获语音→Speech-to-Text（语音转文字）；英语回放→Text-to-Speech（文字转语音）

B. 捕获语音→Speech-to-Text；英语回放→Translator + Text-to-Speech

C. 捕获语音→Text Analytics（语言检测）；英语回放→Translator

D. 捕获语音→Translator；英语回放→Text-to-Speech

&nbsp;

---

**参考答案：B**

**解析：**

完整流程：

1. **捕获语音（法语/德语）→ 文字**：使用 **Speech-to-Text** 服务将法语或德语语音转换为对应语言的文字
2. **以英语回放**（先翻译，再合成语音）：
   - 使用 **Translator** 将法语/德语文字翻译成英语
   - 使用 **Text-to-Speech** 将英文文字合成为语音输出

选项 A 缺少翻译步骤，无法将非英语文本直接以英语播放。完整的流程必须包含翻译环节。

---

## 第 79 题

**背景**

你正在使用 Azure AI Agent Service 和 Semantic Kernel 构建一个代理，该代理使用自定义插件。你需要确保代理满足：

- 使用函数调用（Function Calling）
- 所有匹配指令的函数必须被触发
- 如果用户未提供函数所需的必要参数，代理必须主动向用户索取

**题目**

在 Semantic Kernel 代码中，以下哪个设置组合可以满足上述所有要求？

**选项**

A. `FunctionChoiceBehavior = FunctionChoiceBehavior.Auto()`；`AutoInvokeKernelFunctions = false`

B. `FunctionChoiceBehavior = FunctionChoiceBehavior.Required()`；`AutoInvokeKernelFunctions = true`

C. `ToolCallBehavior = ToolCallBehavior.AutoInvokeKernelFunctions`（自动调用）配合必要参数验证

D. `FunctionChoiceBehavior = FunctionChoiceBehavior.None()`；手动处理工具调用

&nbsp;

---

**参考答案：C**

**解析：**

在 Semantic Kernel 中实现完整函数调用工作流的推荐方式：

- **`ToolCallBehavior.AutoInvokeKernelFunctions`**：允许内核自动识别并调用已注册的插件函数，当 LLM 决定需要调用某个函数时自动执行
- 配合参数验证逻辑：若函数定义中标记了必要参数（`Required`），且用户未提供，模型会生成追问请求，代理会自动向用户索取缺少的参数

`FunctionChoiceBehavior.Required()` 强制模型必须调用函数，但可能导致不必要的函数调用。`Auto()` 允许模型自由决定。具体实现取决于 Semantic Kernel 版本的 API 设计。

> ⚠️ **争议说明**：Semantic Kernel 的 API 在不断演进，具体的设置名称和枚举值在不同版本中有所变化。请以当前稳定版 Semantic Kernel 文档为准。

---

## 第 80 题

**背景**

你需要为企业 DevOps 流水线（Pipeline1）添加一个步骤，用于**识别已创建的 Azure AI 服务账户**。解决方案必须**最小化开发工作量**。

**题目**

应运行哪个 Azure CLI 命令？

**选项**

A. `az resource link`

B. `az account list`

C. `az cognitiveservices account network-rule`

D. `az cognitiveservices account show`

&nbsp;

---

**参考答案：D**

**解析：**

`az cognitiveservices account show` 命令用于**显示特定 Azure 认知服务账户的详细信息**，包括端点、密钥、SKU、区域等，适合在 CI/CD 流水线中用于识别已创建的资源。

- `az resource link`：管理资源之间的链接关系
- `az account list`：列出订阅信息，不是认知服务账户
- `az cognitiveservices account network-rule`：管理认知服务的网络规则

---

## 第 81 题

**背景**

你正在构建一个社交媒体应用，允许用户分享图像。你需要确保不当图像内容被识别并阻止，且解决方案必须**最小化开发工作量**。

**题目**

哪两种工具可以实现该需求？（每个正确答案都是完整解决方案）

**选项**

A. Microsoft Defender for Cloud Apps

B. Azure AI Custom Vision

C. Azure AI Vision

D. Azure AI Content Safety

E. Azure AI Document Intelligence

&nbsp;

---

**参考答案：C、D**

**解析：**

两种最小化开发工作量的图像内容审核方案：

- **Azure AI Vision（C）**：提供图像分析功能，包括成人内容检测（Adult detection），可以判断图像是否包含成人内容或色情内容，内置功能无需自定义训练
- **Azure AI Content Safety（D）**：专门提供内容安全检测，支持对图像中的 Sexual（性内容）、Violence（暴力）、Hate（仇恨）、SelfHarm（自伤）等类别进行检测，API 简单、开发工作量极小

Custom Vision（B）需要自定义训练，开发工作量较大；Document Intelligence（E）用于文档字段提取，不适用于内容审核。

---

## 第 82 题

**背景**

你需要在 Azure 中配置一个 Language Understanding 服务（LUIS），并通过 Microsoft Entra ID（前 Azure AD）令牌来验证应用的身份。

**题目**

为确保应用能够使用 Entra ID 令牌对 Azure AI Speech 服务进行身份验证，应执行哪两项操作？

**选项**

A. 创建条件访问策略（Conditional Access Policy）

B. 创建私有端点（Private Endpoint）

C. 申请 X.509 证书

D. 配置自定义子域（Custom Subdomain）

E. 启用虚拟网络服务端点（Virtual Network Service Endpoint）

&nbsp;

---

**参考答案：B、C**（注：原题答案，存在争议）

**解析：**

> ⚠️ **高争议题目**：原题答案为 B（创建私有端点）和 C（申请 X.509 证书），但这两个选项组合在逻辑上存在明显问题：
> - 使用 Entra ID 令牌认证 Azure AI 服务通常只需要**配置自定义子域（D）** 并进行 Entra ID 应用注册，不需要 X.509 证书
> - 私有端点是网络隔离措施，与令牌认证方式无直接关系

> 微软官方文档显示，对于 Azure Cognitive Services 的 Entra ID 令牌认证，关键步骤是**配置自定义子域（Custom Subdomain）**，因为令牌请求需要通过自定义子域端点。

> 建议以 Azure 官方文档"Authenticate with Microsoft Entra ID"为最终参考，此题答案可能因考题版本不同而有差异。

---

## 第 83 题

**背景**

你正在设计一个内容管理系统，需要优化用户的阅读体验，特别是针对**有阅读困难或学习差异（如阅读障碍症，dyslexia）** 的用户。

**题目**

应在解决方案中包含哪项 Azure 服务？

**选项**

A. Azure AI Translator（翻译器）

B. Azure AI Document Intelligence

C. Azure AI Immersive Reader（沉浸式阅读器）

D. Azure AI Language

&nbsp;

---

**参考答案：C**

**解析：**

**Azure AI Immersive Reader（沉浸式阅读器）** 是专为改善阅读可访问性设计的服务，特别适合有阅读障碍、学习差异或正在学习语言的用户。它提供：

- 大字体、间距调整等视觉优化
- 文本朗读（TTS）
- 音节分割、词性高亮
- 图片词汇解释
- 翻译功能

这些功能直接针对阅读理解困难问题，是处理此类场景的专用服务。

---

## 第 84 题

**背景**

你有一个本地文件夹，包含以下视频文件（假设格式和大小如下）：

- File1：WMV 格式，34 分钟，400 MB
- File2：AVI 格式，90 分钟，1,200 MB
- File3：MOV 格式，300 分钟，980 MB
- File4：MP4 格式，80 分钟，1,800 MB

**题目**

哪些文件可以上传到 Azure AI Video Indexer 网站？

**选项**

A. File1、File2 和 File4 仅

B. File1 和 File2 仅

C. File1、File2 和 File3 仅

D. File1、File2、File3 和 File4 全部

E. File1 和 File3 仅

&nbsp;

---

**参考答案：E（File1 和 File3）**

**解析：**

Azure AI Video Indexer 网站上传的限制：
- **支持格式**：MP4、MOV、WMV、AVI、M2TS 等
- **最大时长**：4 小时（240 分钟）
- **最大文件大小**：通过网站上传为 **2 GB**

按此规则逐一检查：
- **File1**（WMV，34 分钟，400 MB）✅ 格式、时长、大小均符合
- **File2**（AVI，90 分钟，1,200 MB）❌ 文件大小 1.2 GB < 2 GB，格式支持，**但部分资料显示 AVI 不在支持列表内** → 视考题版本而定
- **File3**（MOV，300 分钟，980 MB）✅ MOV 支持，980 MB < 2 GB，300 分钟 = 5 小时 > 4 小时... ❌ 超出时长限制

> ⚠️ **高争议题目**：实际上按上述规则，File1（WMV，34 分钟，400 MB）和 File2（AVI，90 分钟，1.2 GB）才能满足所有限制。但原题答案为 E（File1 和 File3），说明原题中 File3 的参数设置与本文描述的可能不同（原始 PDF 中有图表，文字提取可能存在误差）。请以原始题目中的具体参数为准，核心知识点是：了解 Video Indexer 的格式支持列表、2 GB 大小限制和 4 小时时长限制。

---

## 第 85 题

**背景**

你有一个 Azure AI Content Safety 资源（CS1），需要创建一个**自定义类别（Custom Category）** 来检测特定类型的有害内容。

**题目**

在 cURL 命令中，应使用哪个 HTTP 方法和端点来添加自定义类别？

**选项**

A. `POST /contentsafety/text/categories`

B. `PUT /contentsafety/image/categories/{categoryName}`

C. `PATCH /contentsafety/text/categories/{categoryName}`

D. `POST /contentsafety/text/categories/{categoryName}`

&nbsp;

---

**参考答案：A**

**解析：**

在 Azure AI Content Safety 中，创建自定义类别使用：

```
POST {endpoint}/contentsafety/text/categories?api-version=2024-09-15-preview
```

请求体为 JSON，包含类别名称、描述和示例数据（positive/negative examples）。

使用 `POST` 创建新资源是 REST API 的标准约定；`PUT` 通常用于更新已知 ID 的资源；`PATCH` 用于部分更新。

---

## 第 86 题

**背景**

你正在开发一个使用 Azure AI Language 服务分析文档的应用，需要**识别文档中的行业特定技术术语**。解决方案必须**最小化开发工作量**。

**题目**

应使用什么功能？

**选项**

A. 关键短语提取（Key Phrase Extraction）

B. 自定义命名实体识别（Custom NER）

C. 对话语言理解（Conversational Language Understanding，CLU）

D. 语言检测（Language Detection）

&nbsp;

---

**参考答案：B**

**解析：**

**自定义命名实体识别（Custom NER）** 允许训练模型识别特定领域的专有术语（如行业技术术语、内部产品名称、专业词汇等），这些术语不在通用 NER 的标准实体类型中。

- 关键短语提取（A）提取通用重要短语，不能精确识别特定实体类型
- CLU（C）用于意图识别和对话理解，不是文档实体提取
- 语言检测（D）只检测文本语言，不识别术语

虽然 Custom NER 需要准备训练数据，但在三个选项中，它是唯一能完成"识别特定行业术语"任务的功能。

---

## 第 87 题

**背景**

你有一个 Azure AI Search 索引（AlSearch1），其中包含向量字段。你需要将一篇用户输入的文章与现有文档进行**语义相似度比较**。

**题目**

应使用哪种 Azure OpenAI 模型生成文章的向量表示？

**选项**

A. `text-embedding-ada-002`

B. `gpt-4-vision-preview`

C. `text-davinci-003`

D. `dall-e-3`

&nbsp;

---

**参考答案：A**

**解析：**

`text-embedding-ada-002`（或更新的 `text-embedding-3-small`/`text-embedding-3-large`）是 Azure OpenAI 提供的**文本嵌入模型**，专门将文本转换为语义向量，用于：

- 语义相似度搜索
- 向量数据库匹配
- 文档聚类

生成的向量可以与 Azure AI Search 的向量索引配合，实现向量相似度搜索（Vector Search）。其他选项均为对话/生成模型，不输出向量。

---

## 第 88 题

**背景**

你正在构建一个解决方案，需要对人力资源（HR）政策（存储为 PDF 格式）进行问题解答，且要求**对同一问题每次都返回完全相同的答案**。解决方案必须**最小化开发工作量**。

**题目**

应在解决方案中使用哪个服务？

**选项**

A. Azure AI Language（自定义问题解答）

B. Azure Machine Learning

C. Azure OpenAI

D. Azure AI Document Intelligence

&nbsp;

---

**参考答案：A**

**解析：**

**Azure AI Language 自定义问题解答（Custom Question Answering）** 对于匹配到的问答对会**始终返回相同的确定性答案**，不会因随机性参数（如 Temperature）而产生不同输出。

Azure OpenAI（C）基于大语言模型，即使 Temperature=0，对同一问题的回答也可能略有不同（特别是复杂问题）。此外，Azure OpenAI 的配置和成本更高。

自定义问答服务的答案直接来自用户定义的问答对数据库，完全确定性，且开发工作量最小。

---

## 第 89 题

**背景**

你有以下文件，需要使用 Azure AI Content Understanding 进行分析：

- File1.pdf
- File2.jpg
- File3.docx
- File4.webp
- File5.png

**题目**

哪些文件可以使用 Azure AI Content Understanding 进行分析？

**选项**

A. File1.pdf 和 File3.docx 仅

B. File1.pdf、File2.jpg 和 File5.png 仅

C. File1.pdf、File2.jpg 和 File3.docx 仅

D. File1.pdf、File2.jpg、File3.docx 和 File5.png 仅

E. File1.pdf、File2.jpg、File3.docx、File4.webp 和 File5.png 全部

&nbsp;

---

**参考答案：D**

**解析：**

Azure AI Content Understanding 支持的文件格式包括：
- **PDF** ✅
- **JPEG / JPG** ✅
- **DOCX**（Word 文档）✅
- **PNG** ✅
- **TIFF** ✅
- **MP4**（视频）✅
- **MP3**（音频）✅

**不支持**的格式：
- **WebP（File4.webp）** ❌：虽然 WebP 是常见图像格式，但目前不在 Content Understanding 的支持列表中

因此 File1（PDF）、File2（JPG）、File3（DOCX）和 File5（PNG）均可分析，但 File4（WebP）不支持。

---

## 第 90 题

**背景**

你正在构建一个应用，需要从文本消息中使用 Azure AI Language 的**实体链接（Entity Linking）** 功能，为文本中提及的实体**提供参考链接到 Wikipedia 等支持文章**。

**题目**

应使用哪个 Azure AI Language 功能？

**选项**

A. 实体链接（Entity Linking）

B. 自定义命名实体识别（Custom NER）

C. Azure AI Content Safety

D. 关键短语提取（Key Phrase Extraction）

&nbsp;

---

**参考答案：A**

**解析：**

**实体链接（Entity Linking）** 是 Azure AI Language 的功能，可以：

1. 识别文本中提到的已知实体（如地点、人物、组织、概念等）
2. 将这些实体与 Wikipedia（或其他知识库）中的对应词条**建立链接**，返回相关 URL

这正是题目要求的"为文本添加 Wikipedia 参考链接"的功能。

示例：文本"我们参观了伦敦的大英博物馆"中，"大英博物馆"会被链接到其 Wikipedia 页面。

---

## 第 91 题

**背景**

你正在使用 Azure AI Agent Service 构建一个代理（Agent），用于在 Azure AI Foundry 中运行。

你有以下需求：
- 代理能够理解用户的书面和口头问题
- 生成问题的答案
- 以语音形式输出答案

**题目**

应使用哪个工具来创建代理项目？

**选项**

A. Language Studio

B. Azure AI Foundry

C. Speech Studio

D. Azure 门户

&nbsp;

---

**参考答案：B**

**解析：**

**Azure AI Foundry** 是微软提供的统一 AI 开发平台，专门用于：
- 创建和管理 AI Agent 项目
- 集成多种 Azure AI 服务（Language、Speech、OpenAI 等）
- 构建端到端 AI 解决方案

Azure AI Agent Service 在 AI Foundry 中进行配置和部署，这是创建具有语音输入/输出能力代理的统一入口。

> ⚠️ **争议说明**：原题（355）给出的答案为 C（Speech Studio）。但从场景描述来看，该代理需要"理解用户的书面和口头问题 + 生成答案 + 以语音输出"这三个复合能力，仅用 Speech Studio 无法完成全部配置。Azure AI Foundry 是更完整的答案。请以官方考试题目为最终参考。

---

## 第 92 题

**背景**

你需要准备 Azure OpenAI 模型的微调（Fine-tuning）训练数据，有 500 组提示-补全对（Prompt-Completion Pairs）。

**题目**

训练数据文件应使用哪种格式？

**选项**

A. XML

B. JSONL（JSON Lines）

C. CSV

D. TSV

&nbsp;

---

**参考答案：B**

**解析：**

Azure OpenAI 微调训练数据的**标准格式为 JSONL**（每行一个 JSON 对象），格式如下：

```jsonl
{"messages": [{"role": "system", "content": "..."}, {"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]}
{"messages": [{"role": "system", "content": "..."}, {"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]}
```

每行包含一个完整的对话示例（Chat format），符合 OpenAI 微调数据要求。

XML、CSV、TSV 均不是 Azure OpenAI 微调数据的支持格式。

---

## 第 93 题

**背景**

你构建了一个使用 Azure AI Language 自定义问题解答服务的聊天机器人，知识库基于内部支持 FAQ 文档训练。

你发现聊天机器人**无法对常见问题提供正确答案**。你需要提高响应准确性，且解决方案必须**最小化开发工作量**。

**题目**

应在 Language Studio 中按顺序执行哪三项操作？

**选项**（排序）

A. 启用主动学习（Enable Active Learning）

B. 查看主动学习建议（Review active learning suggestions）

C. 接受建议并添加为替代问题

D. 保存并训练知识库

E. 重新发布知识库

&nbsp;

---

**参考答案：A → B（含 C）→ D → E**（核心三步为 A → D → E，视题目选项而定）

**解析：**

使用主动学习提高问答准确性的完整流程：

1. **启用主动学习（A）**：系统开始根据用户查询自动建议改进的问答对
2. **查看并接受建议（B/C）**：在 Language Studio 中审核主动学习推荐的替代问法，接受合适的建议
3. **保存并训练（D）**：将修改保存并重新训练知识库
4. **重新发布（E）**：发布使修改生效

主动学习通过分析用户真实查询来改进知识库，是成本最低、工作量最小的改进方式。

---

## 第 94 题

**背景**

你正在构建一个语言学习解决方案，需要推荐哪些 Azure 服务来完成以下任务：

- **任务1**：分析教师提交的课程计划，提取关键字段（如课时、必读文本）
- **任务2**：分析学习内容，为文本中的常用词汇或短语提供图片示意

解决方案必须**最小化开发工作量**。

**题目**

这两个任务应分别使用什么 Azure 服务？

**选项**

A. 任务1→Azure AI Document Intelligence；任务2→Azure AI Vision（Image Analysis）

B. 任务1→Azure AI Language（Key Phrase Extraction）；任务2→Azure AI Custom Vision

C. 任务1→Azure AI Document Intelligence；任务2→Azure AI Immersive Reader

D. 任务1→Azure AI Language（Named Entity Recognition）；任务2→Azure AI Vision

&nbsp;

---

**参考答案：C**

**解析：**

- **任务1（提取课程计划关键字段）**：**Azure AI Document Intelligence** 可以从结构化或半结构化文档中提取特定字段（如日期、文本列表等），利用预构建或自定义模型提取"课时"、"必读文本"等字段，开发工作量小
- **任务2（为词汇配图）**：**Azure AI Immersive Reader（沉浸式阅读器）** 内置了"图片词汇表（Picture Vocabulary）"功能，可以为文本中的常用词汇自动显示相关图片，这正是为语言学习者设计的功能，无需额外开发

---

## 第 95 题

**背景**

你有一个 Azure AI Document Intelligence 资源（AIdoc1，Standard S0 层），需要使用**业务名片模型 v2.1** 分析名片图像的应用（App1）。

你需要**更新 App1 以支持二维码（QR Code）识别**。解决方案必须**最小化管理工作量**。

**题目**

第一步应该做什么？

**选项**

A. 部署自定义模型

B. 实现 Read 模型

C. 将业务名片模型升级到 v3.0

D. 实现合同（Contract）模型

&nbsp;

---

**参考答案：C**

**解析：**

Azure AI Document Intelligence 的**业务名片模型 v3.0** 新增了对二维码（QR Code）的支持，而 v2.1 不包含此功能。

直接将 App1 中调用的 API 版本从 v2.1 升级到 v3.0 即可获得 QR 码识别能力，无需重新部署自定义模型或实现全新模型，管理工作量最小。

---

## 第 96 题

**背景**

你的应用需要使用 Azure AI Speech 服务和 Language API，且需要通过**单一端点和凭据**访问所有服务。

**题目**

应创建哪种类型的 Azure 资源？

**选项**

A. Azure AI Language 资源

B. Azure AI Foundry service（AI Foundry 服务）

C. Azure AI Speech 资源

D. Azure AI Foundry Content Safety

&nbsp;

---

**参考答案：B**

**解析：**

**Azure AI Foundry service**（原 Azure AI Services 的升级形态）提供了通过单一端点和凭据访问多种 Azure AI 服务的能力，包括 Speech 和 Language API。

> ⚠️ **注意**：此题与第 24 题（答案为 Azure Cognitive Services 多服务资源）类似，但答案不同，因为该题明确提到了 Azure AI Foundry service。这反映了 Azure AI 服务的品牌重组：Azure Cognitive Services → Azure AI Services → Azure AI Foundry。功能上等同，但使用的名称随平台演进而变化。

---

## 第 97 题

**背景**

你有一个 Azure AI Search 解决方案，包含一个知识存储，其中存有非结构化 JSON 数据和扫描 PDF 文档中的文本。

**题目**

对于以下两种数据类型，应分别使用哪种投影类型？

- 非结构化 JSON 数据
- 扫描 PDF 中提取的图像/文件

**选项**

A. JSON 数据→表投影（Table projection）；PDF 图像→对象投影（Object projection）

B. JSON 数据→对象投影（Object projection）；PDF 图像→文件投影（File projection）

C. JSON 数据→文件投影（File projection）；PDF 图像→表投影（Table projection）

D. JSON 数据→对象投影（Object projection）；PDF 图像→对象投影（Object projection）

&nbsp;

---

**参考答案：B**

**解析：**

Azure AI Search 知识存储的三种投影类型：

| 投影类型 | 用途 |
|---------|------|
| **Object projection（对象投影）** | 将 JSON 数据存储为 Azure Blob 中的 JSON 文件，适合非结构化/半结构化数据 |
| **File projection（文件投影）** | 将二进制文件（如图像、规范化图像）存储到 Blob 存储，适合 PDF 中提取的图像 |
| Table projection（表投影） | 将数据存储为 Azure 表存储中的行，适合结构化/表格数据 |

---

## 第 98 题

**背景**

你正在构建一个处理用户输入文档并识别潜在暴力相关图像内容的解决方案，使用 Azure AI Content Safety 资源（Resource1）和存储账户（storage1）中的样本图像集。

**题目**

提交图像给 Content Safety API 进行暴力检测时，期望的输出结果是什么？

对于一张仅包含圆形（circle）的测试图像，暴力内容检测的得分应该是多少？

**选项**

A. 0

B. 0.0

C. 7

D. 100

&nbsp;

---

**参考答案：A 或 C（视题目要求）**

**解析：**

Azure AI Content Safety 图像检测 API 返回每个类别的**严重性得分（Severity Score）**，范围为 0-7（整数）：
- **0**：未检测到该类别内容
- **2**：轻微
- **4**：中等
- **6**：严重
- **7**：非常严重

对于只包含圆形的图像，**暴力内容得分应为 0**（没有暴力内容）。

> ⚠️ **注意**：原题（322）的答案为 A 和 C 两个选项，这可能是因为题目询问了多个类别或多种场景的输出。暴力检测为 0，某些其他内容类别可能也为 0（非 7）。请结合原始题目图表内容理解。

---

## 第 99 题

**背景**

你正在开发一个应用，使用 Azure AI Language 服务对文本中的城市名称进行命名实体识别（NER）检测。

**题目**

在调用 `RecognizeEntities` 方法时，以下说法是否正确？

假设调用时传入文本："Our tour of London included a visit to Buckingham Palace."

该函数的输出将是什么？

**选项**

A. Our tour of London included a visit to Buckingham Palace

B. London 和 Tour（仅这两项）

C. Tour 和 visit（仅这两项）

D. London 和 Buckingham Palace（仅这两项）

&nbsp;

---

**参考答案：D**

**解析：**

命名实体识别（NER）API 会从文本中识别具有语义意义的命名实体，如：
- **地理位置（Location）**：London、Buckingham Palace

对于句子 "Our tour of London included a visit to Buckingham Palace."：
- "London"：地理位置实体 ✅
- "Buckingham Palace"：地理位置实体（著名建筑/地点）✅
- "tour"、"visit" 等词：动词/普通名词，不是命名实体，NER 不会返回

因此输出为 **London 和 Buckingham Palace**。

---

## 第 100 题

**背景**

你正在构建一个 Azure AI Foundry 项目中的代理，需要利用 Azure AI Search 索引数据来回答用户问题。你需要将 Azure AI Search 索引连接到代理。

**题目**

为了让代理能够访问 Azure AI Search 中 GPT-4 向量索引的数据，在 Azure AI Foundry 中应为代理配置哪种工具类型？

**选项**

A. `FileSearchTool`

B. `BingGroundingTool`

C. `AzureAISearchTool`

D. `CodeInterpreterTool`

&nbsp;

---

**参考答案：C**

**解析：**

**AzureAISearchTool** 是 Azure AI Agent Service 中专门用于连接 Azure AI Search 索引的工具。它允许代理在对话过程中**检索 Search 索引中的相关文档**，实现 RAG（检索增强生成）模式：

```python
from azure.ai.projects.models import AzureAISearchTool

search_tool = AzureAISearchTool(
    index_connection_id=connection.id,
    index_name="your-index-name"
)
```

- FileSearchTool：用于搜索已上传到代理的文件（非 Search 索引）
- BingGroundingTool：用于实时网络搜索
- CodeInterpreterTool：用于代码执行和数据分析

---

## 第 101 题

**背景**

你正在构建一个使用 Azure OpenAI GPT-4 模型的聊天机器人，需要确保机器人**不会返回包含仇恨言论的答案**。

**题目**

应为 GPT-4 模型配置什么？

**选项**

A. Frequency penalty（频率惩罚）参数

B. 滥用监控（Abuse Monitoring）

C. 内容过滤器（Content Filter）

D. Temperature 参数

&nbsp;

---

**参考答案：C**

**解析：**

**内容过滤器（Content Filter）** 是 Azure OpenAI 的内置安全机制，可以对模型的输入和输出进行实时检测，自动拦截包含仇恨言论（Hate）、暴力（Violence）、色情（Sexual）、自伤（Self-harm）等有害内容的请求和响应。

- Frequency penalty（A）：用于减少重复词汇，影响输出多样性，与内容安全无关
- 滥用监控（B）：用于监控 API 使用是否符合使用政策，是事后监控而非实时拦截
- Temperature（D）：控制输出随机性，不影响内容安全

> ⚠️ **争议说明**：原题（248）给出的答案为 B（Abuse Monitoring），理由是"滥用监控"可以检测并标记包含有害内容的请求。但微软官方文档明确指出，**内容过滤器（Content Filter）** 才是主动防止有害内容输出的机制，滥用监控更偏向于合规审计。建议以 Azure OpenAI 内容安全文档为准，答案倾向于 C。

---

## 第 102 题

**背景**

你有一个名为 AI1 的 Azure OpenAI 资源，其中部署了三个 GPT-3.5 模型，每个针对不同工作负载优化。你计划部署三个应用，每个应用通过 REST API 访问 AI1，并使用针对其工作负载优化的部署。

你需要为每个应用提供对 AI1 的访问权限，并确保**只有这些应用才能访问 AI1**。

**题目**

应使用什么方式为应用提供对 AI1 的访问，以及每个应用应使用什么来连接到对应的部署？

**选项**

A. 访问方式：API 密钥；连接部署：模型名称

B. 访问方式：Bearer 令牌（Entra ID）；连接部署：部署名称

C. 访问方式：API 密钥；连接部署：部署名称

D. 访问方式：Bearer 令牌；连接部署：模型类型

&nbsp;

---

**参考答案：B**

**解析：**

- **提供访问**：使用 **Microsoft Entra ID 的 Bearer 令牌**（托管标识 Managed Identity）。通过 Azure RBAC 为每个应用分配特定角色（如 Cognitive Services OpenAI User），可以精确控制哪些应用可以访问 AI1，是微软推荐的最安全方式
- **连接到特定部署**：Azure OpenAI REST API 路径中使用**部署名称**（Deployment Name）：
  ```
  POST /openai/deployments/{deployment-name}/chat/completions
  ```

> ⚠️ **注意**：在实际使用中 API 密钥也有效，但 Bearer 令牌提供更细粒度的访问控制，符合"只有这些应用才能访问"的安全要求。

---

## 第 103 题

**背景**

你有一个包含两个 Azure 资源的订阅：Azure OpenAI 资源（AI1）和 Azure AI Content Safety 资源（CS1）。你构建了一个聊天机器人，使用 AI1 生成答案，使用 CS1 检查输入输出中的不当内容。

你需要**优化内容过滤器配置**，通过运行示例问题来测试配置效果。

以下三种方案，哪种能满足需求？

**题目**

- 方案 A：从 Content Safety Studio 使用**文本内容审核（Moderate text content）** 功能运行测试
- 方案 B：从 Content Safety Studio 使用**受保护材料检测（Protected material detection）** 功能运行测试
- 方案 C：从 Content Safety Studio 使用**在线活动监控（Monitor online activity）** 功能运行测试

哪种方案满足要求？

**选项**

A. 仅方案 A

B. 仅方案 B

C. 仅方案 C

D. 三种方案均不满足

&nbsp;

---

**参考答案：A**

**解析：**

> ⚠️ **高争议题目**：原题（307）给出的答案为 B（Not meet the goal，方案 A），但从逻辑分析：

- **方案 A（文本内容审核）**：Content Safety Studio 的"Moderate text content"功能正是用于测试文本内容过滤配置，允许输入示例文本并查看各类别的检测结果，可以据此调整过滤阈值。这实际上**满足**"运行示例问题以优化内容过滤器配置"的需求
- **方案 B（受保护材料检测）**：用于检测内容是否涉及版权保护材料（如代码、歌词），与内容过滤器配置优化无直接关系
- **方案 C（在线活动监控）**：用于查看历史使用趋势和日志分析，不能运行测试

实际上微软文档中指出方案 A 是正确的测试方式，但原题多个版本（282、283、284）均答 B（No）。建议考生以最新官方考试指南为准，注意题目细节差异。

---

## 第 104 题

**背景**

你有一个 Azure OpenAI 资源（AI1）和一个用户（User1）。

你需要确保 User1 能执行以下操作：
- 向 AI1 **上传数据集**
- **微调（Fine-tune）** AI1 中的现有模型

解决方案必须遵循**最小权限原则**。

**题目**

应为 User1 分配哪个角色？

**选项**

A. Cognitive Services Contributor

B. Contributor

C. Cognitive Services OpenAI User

D. Cognitive Services OpenAI Contributor

&nbsp;

---

**参考答案：D**

**解析：**

各角色权限对比：

| 角色 | 权限范围 |
|------|---------|
| Cognitive Services OpenAI User | 只能查询/使用已部署模型（读取），不能上传数据或微调 |
| **Cognitive Services OpenAI Contributor** | 可以上传训练数据、微调模型、创建部署（写入操作），但不能管理资源本身 |
| Cognitive Services Contributor | 可管理所有认知服务资源，权限过大 |
| Contributor | 可管理整个资源组，权限最大 |

**Cognitive Services OpenAI Contributor** 是在最小权限原则下满足上传数据集和微调模型需求的正确角色。

> ⚠️ **争议说明**：原题（308）答案给出为 C（Cognitive Services OpenAI User），但按照微软 RBAC 文档，OpenAI User 只有使用权限，无法上传数据和微调。**D（Cognitive Services OpenAI Contributor）** 才是正确答案，请以 Azure OpenAI RBAC 文档为准。

---

## 第 105 题

**背景**

你正在构建一个电话处理解决方案，使用 Azure AI Speech 服务和**自定义神经语音（Custom Neural Voice）**。

你需要从 Speech Studio 创建自定义语音模型。

**题目**

在 Speech Studio 中，创建自定义语音模型应按顺序执行哪五项操作？

**选项**（选出正确的五项并排序）

A. 创建项目（Create a project）

B. 上传训练数据（Upload training data）

C. 训练模型（Train the model）

D. 获取语音人才同意（Obtain voice talent consent）

E. 部署模型到端点（Deploy to endpoint）

F. 使用 SSML 测试语音效果

G. 注册 Direct Line Speech 频道

&nbsp;

---

**参考答案：D → A → B → C → E**

**解析：**

创建自定义神经语音的完整流程（符合微软负责任 AI 要求）：

1. **获取语音人才同意（D）**：必须先获得声音原型人的书面同意，这是合规要求，不可跳过
2. **创建项目（A）**：在 Speech Studio 中新建 Custom Neural Voice 项目
3. **上传训练数据（B）**：上传录音数据（WAV 文件）和对应的文字稿（TXT）
4. **训练模型（C）**：使用上传的数据训练神经语音模型
5. **部署到端点（E）**：将训练好的模型部署为可调用的端点

---

## 第 106 题

**背景**

你有一个用于机器人部署的 Azure DevOps 流水线（Pipeline1）。流水线包含创建 Azure AI 服务账户的步骤。你需要添加一个步骤来**识别已创建的 Azure AI 服务账户**，且解决方案必须**最小化开发工作量**。

**题目**

应运行哪个 Azure CLI 命令？

**选项**

A. `az resource link`

B. `az account list`

C. `az cognitiveservices account network-rule list`

D. `az cognitiveservices account show`

&nbsp;

---

**参考答案：D**

**解析：**

`az cognitiveservices account show --name <账户名> --resource-group <资源组>` 命令用于**显示指定 Azure AI 服务账户的完整详情**，包括：端点 URL、SKU、区域、密钥获取方式等。

在 CI/CD 流水线中，该命令可以在创建账户后立即获取账户信息（如端点），供后续步骤使用，开发工作量极小。

---

## 第 107 题

**背景**

你正在构建一个代理，使用 Semantic Kernel SDK，该代理将使用**自定义插件（Custom Plugin）**，并满足以下要求：

- 代理必须使用函数调用（Function Calling）
- 所有与指令匹配的函数都必须被触发
- 如果用户未提供函数的必要参数，代理必须向用户索取

**题目**

在 Semantic Kernel 代码中，应将 `FunctionChoiceBehavior` 设置为什么，以及执行设置应如何配置？

**选项**

A. `FunctionChoiceBehavior.Auto()`；`AutoInvokeKernelFunctions = true`

B. `FunctionChoiceBehavior.None()`；`AutoInvokeKernelFunctions = false`

C. `FunctionChoiceBehavior.Required()`；手动处理工具调用响应

D. `FunctionChoiceBehavior.Auto()` 搭配 `ToolCallBehavior.AutoInvokeKernelFunctions`

&nbsp;

---

**参考答案：A**

**解析：**

在 Semantic Kernel 中：

- **`FunctionChoiceBehavior.Auto()`**：允许内核自动判断何时调用插件函数，并在需要时自动触发所有匹配的函数
- **`AutoInvokeKernelFunctions = true`**：启用自动调用内核函数，当 LLM 决定调用函数时，SDK 会自动执行对应的插件方法

关于"向用户索取缺少的参数"：这通过插件函数的参数定义（`KernelFunction` 属性中标记的必要参数）实现，当参数缺失时，模型会生成追问。

`Required()` 强制每次响应都必须调用函数，不适合一般对话场景。

---

## 第 108 题

**背景**

你有一个 Azure AI 内容理解（Content Understanding）资源（cu1），需要创建一个**自定义分析器（Custom Analyzer）** 来分析文档。

**题目**

在 cURL 命令中，应使用哪个 HTTP 方法和端点路径来创建自定义分析器？

**选项**

A. `GET /contentunderstanding/analyzers/{analyzerName}`

B. `PUT /contentunderstanding/analyzers/{analyzerName}`

C. `POST /contentunderstanding/analyzers`

D. `PATCH /contentunderstanding/analyzers/{analyzerName}`

&nbsp;

---

**参考答案：B**

**解析：**

Azure AI Content Understanding 创建自定义分析器使用 `PUT` 方法：

```
PUT {endpoint}/contentunderstanding/analyzers/{analyzerName}?api-version=2024-12-01-preview
```

`PUT` 方法是"创建或替换"语义，用于按名称创建资源（幂等操作）。若分析器不存在则创建，若已存在则覆盖。

`POST` 通常用于集合端点（如 `/analyzers`）创建新资源（服务端分配 ID），但 Content Understanding API 使用 PUT + 用户指定名称的模式。

---

## 第 109 题

**背景**

你有一个 Azure AI Speech 服务资源（Resource1），并运行以下 Python 代码：

```python
speech_config = speechsdk.SpeechConfig(
    subscription="your_key",
    region="eastus"
)
audio_config = speechsdk.audio.AudioOutputConfig(
    filename="Output.mp3"
)
synthesizer = speechsdk.SpeechSynthesizer(
    speech_config=speech_config,
    audio_config=audio_config
)
result = synthesizer.speak_text_async("Hello World").get()
```

**题目**

运行上述代码后播放 Output.mp3 文件，以下哪项说法正确？

**选项**

A. Output.mp3 包含用中文朗读的"Hello World"

B. Output.mp3 包含用默认语音（英语）朗读的"Hello World"

C. 代码会失败，因为未指定语音名称（voice name）

D. Output.mp3 的格式为 WAV 而非 MP3

&nbsp;

---

**参考答案：B**

**解析：**

当 `SpeechConfig` 未显式设置 `speech_synthesis_voice_name` 时，Azure AI Speech 服务会使用**默认语音**（通常为英语神经语音，如 en-US-JennyNeural）来合成文本。

代码中使用 `AudioOutputConfig(filename="Output.mp3")` 将输出保存为 MP3 文件（SDK 支持多种音频格式输出），不会失败。

语音服务不会因为未指定 voice name 而报错，会使用区域的默认语音。

---

## 第 110 题

**背景**

你正在构建一个语言学习应用，使用 Azure AI Language 服务分析文本。你需要识别文本中**知名艺人的乐队名称**（如"The Beatles"、"BTS"等），并提供指向相关 Wikipedia 页面的链接以供参考。

**题目**

应使用哪个 Azure AI Language 功能？

**选项**

A. 关键短语提取（Key Phrase Extraction）

B. 对话语言理解（CLU）

C. 实体链接（Entity Linking）

D. 命名实体识别（NER）

&nbsp;

---

**参考答案：C**

**解析：**

**实体链接（Entity Linking）** 不仅能识别文本中的命名实体，还能将识别到的实体**链接到 Wikipedia 等知识库中的对应词条**，返回实体的 Wikipedia URL、bingId 等信息。

这正是"识别乐队名称并提供 Wikipedia 链接"所需的功能。

区别于 NER（只识别实体类型，如"乐队是一种组织"，不提供外部链接）。

---

## 第 111 题

**背景**

你正在设计一个解决方案，需要对存储为 PDF 格式的人力资源政策进行问答。要求对**同一问题始终返回完全相同的答案**，且解决方案必须**最小化开发工作量**。

**题目**

应在解决方案中包含哪个服务？

**选项**

A. Azure AI Language（自定义问题解答）

B. Azure Machine Learning

C. Azure OpenAI（GPT-4）

D. Azure AI Document Intelligence

&nbsp;

---

**参考答案：A**

**解析：**

**Azure AI Language 自定义问题解答** 对已定义的问答对提供**确定性答案**，相同问题总是返回相同答案（不像 LLM 会因随机性产生差异）。直接上传 PDF 文件后，系统自动提取问答对，开发工作量极小。

Azure OpenAI（C）虽然可以配置 Temperature=0 以减少随机性，但无法保证对复杂问题 100% 返回完全相同的措辞，且配置更复杂。

---

## 第 112 题

**背景**

你正在构建一个 Azure AI Agent Service 代理，需要使用 **Azure AI Foundry Agent Service** 部署该代理，其中包含一个自定义 API，用于获取给定位置的当前时间。

你需要**测试该自定义 API 的功能**。

**题目**

在 cURL 命令测试中，应使用哪种方式来调用自定义 API 端点？

**选项**

A. 使用 `POST` 方法直接调用代理端点，并在请求体中包含 API 调用参数

B. 在 Azure AI Foundry 中，使用 Agent playground 向代理发送包含位置信息的测试消息

C. 使用 `GET` 方法调用自定义 API 的直接端点（如 `https://api.example.com/time?location=Tokyo`）

D. 在 Azure 门户中，使用"诊断和解决问题"工具测试 API

&nbsp;

---

**参考答案：C**

**解析：**

测试**自定义 API 功能**时（而非测试代理本身），应直接调用 API 端点来验证其返回值是否正确。使用 cURL 对自定义 API URL 发起 GET 请求（如 `curl "https://api.example.com/time?location=Tokyo"`）是最直接的测试方式。

只有确认自定义 API 本身工作正常后，才将其注册为代理的工具（Tool），这样可以隔离问题定位。

---

## 第 113 题

**背景**

你正在为 Azure AI Search 创建一个带有技能集（Skillset）的索引器，该技能集包含一个执行语言检测和情感分析的自定义技能。

你需要了解 Azure AI Search 对文档进行**索引处理的顺序**。

**题目**

以下哪个选项正确描述了索引器处理文档时各阶段的执行顺序？

**选项**

A. 字段映射 → 文档破解 → 技能执行 → 输出字段映射 → 索引写入

B. 文档破解 → 技能执行 → 字段映射 → 输出字段映射 → 索引写入

C. 文档破解 → 字段映射 → 技能执行 → 输出字段映射 → 索引写入

D. 技能执行 → 文档破解 → 字段映射 → 输出字段映射 → 索引写入

&nbsp;

---

**参考答案：C**

**解析：**

Azure AI Search 索引器处理文档的标准顺序：

1. **文档破解（Document Cracking）**：从源格式（PDF、图片、Word 等）中提取原始内容
2. **字段映射（Field Mapping）**：将数据源字段映射到索引器的内部表示
3. **技能执行（Skill Execution）**：依次执行技能集中定义的所有 AI 技能（OCR、NER、情感分析等）
4. **输出字段映射（Output Field Mapping）**：将技能输出映射到目标搜索索引字段
5. **索引写入（Index Write）**：将所有数据持久化到搜索索引

---

## 第 114 题

**背景**

你正在使用 Azure AI Speech 服务构建一个将音频文件翻译的应用。应用需要将英语音频翻译成意大利语。

**题目**

在 Speech SDK 代码中，用于设置**源语言（输入语言）** 和**目标语言（输出语言）** 的正确配置是什么？

**选项**

A. `translationConfig.SpeechRecognitionLanguage = "it-IT"`；`translationConfig.AddTargetLanguage("en-US")`

B. `translationConfig.SpeechRecognitionLanguage = "en-US"`；`translationConfig.AddTargetLanguage("it")`

C. `translationConfig.SourceLanguage = "en"`；`translationConfig.TargetLanguage = "it-IT"`

D. `translationConfig.SpeechRecognitionLanguage = "en-US"`；`translationConfig.AddTargetLanguage("it-IT")`

&nbsp;

---

**参考答案：B**

**解析：**

在 Speech Translation SDK 中：

- **`SpeechRecognitionLanguage`**：设置**源语言**（语音输入语言），使用完整区域代码，如 `"en-US"`（英语-美国）
- **`AddTargetLanguage()`**：添加**翻译目标语言**，使用两字母语言代码，如 `"it"`（意大利语）

注意：目标语言参数使用的是 `"it"`（ISO 639-1 代码），而非 `"it-IT"`（区域代码）。这是 Speech Translation API 的特有规范，与 `SpeechRecognitionLanguage` 使用区域代码不同。

---

## 第 115 题

**背景**

你有一个 Azure AI 订阅，包含 Azure AI Content Safety 资源（resource1）。你构建了一个社交媒体应用，允许用户上传图像，需要对用户上传内容进行内容审核。

**题目**

以下 cURL 命令中，哪些说法关于该命令是否正确？（判断题）

假设命令使用了 `POST` 方法调用 `/contentsafety/image:analyze` 端点，请求体包含图像 URL，头部包含订阅密钥，并指定检测类别为 `["Hate", "SelfHarm", "Sexual", "Violence"]`。

判断以下说法：
1. 命令使用了正确的 HTTP 方法
2. 该命令可以同时检测图像中的多个内容类别
3. 该命令可以直接处理本地文件路径（如 `C:\images\test.jpg`）

**选项**

A. 1-是，2-是，3-是

B. 1-是，2-是，3-否

C. 1-否，2-是，3-否

D. 1-是，2-否，3-是

&nbsp;

---

**参考答案：B**

**解析：**

1. **正确（是）**：Azure AI Content Safety 图像分析端点确实使用 `POST` 方法
2. **正确（是）**：通过在请求体中指定 `categories` 数组（如 `["Hate", "SelfHarm", "Sexual", "Violence"]`），可以在一次调用中同时检测多个内容类别
3. **错误（否）**：API 接受**图像 URL** 或 **Base64 编码的图像数据**，无法直接处理本地文件路径。本地图像必须先转换为 Base64 编码或上传至可公开访问的 URL

---

## 第 116 题

**背景**

你需要部署一个 Azure OpenAI 资源，并使用 ARM 模板（Azure Resource Manager Template）确保资源能够响应每分钟 600 个请求。

**题目**

在 ARM 模板中，应如何配置该资源以满足请求速率要求？

**选项**

A. 在 `sku` 属性中设置 `capacity: 600`

B. 在 `properties` 中设置 `rateLimit: 600`

C. 在部署（Deployment）资源的 `sku` 属性中设置 `capacity: 60`（单位为千 token/分钟，600 rps ≈ 60K TPM）

D. 在 ARM 模板的 `parameters` 中设置 `requestsPerMinute: 600`

&nbsp;

---

**参考答案：C**

**解析：**

在 Azure OpenAI 的 ARM 模板中，模型部署（Deployment）资源的 **`sku.capacity`** 字段用于设置**每分钟 Token 数量（Tokens Per Minute，TPM）**，单位为"千"：

```json
{
  "type": "Microsoft.CognitiveServices/accounts/deployments",
  "sku": {
    "name": "Standard",
    "capacity": 60
  }
}
```

`capacity: 60` 表示 60,000 TPM，可以支持约 600 RPM（Requests Per Minute）的标准请求速率。

不存在 `rateLimit` 或 `requestsPerMinute` 这样的直接属性。

---

## 第 117 题

**背景**

你有一个包含数千张图像的图库，需要将这些图像分类为**照片（photograph）**、**手绘图（drawing）** 或**剪贴画（clipart）**。

**题目**

应使用哪个 Computer Vision 端点，并关注响应中的哪个属性？

**选项**

A. 使用 `/analyze`（POST），`visualFeatures=Tags`，关注 `tags[].name`

B. 使用 `/analyze`（POST），`visualFeatures=ImageType`，关注 `imageType.clipArtType` 和 `imageType.lineDrawingType`

C. 使用 `/describe`（POST），关注 `description.captions[].text`

D. 使用自定义视觉（Custom Vision）进行三分类

&nbsp;

---

**参考答案：B**

**解析：**

Computer Vision 的 `Analyze Image` API 中，`ImageType` 特性专门提供以下信息：

- **`clipArtType`**：0（非剪贴画）→ 3（高质量剪贴画）的整数评分
- **`lineDrawingType`**：0（非线条画）或 1（是线条画/手绘图）

通过这两个属性可以区分照片（两者均为 0）、剪贴画（clipArtType > 0）和手绘图（lineDrawingType = 1）。

此功能无需自定义训练，开发工作量最小。

---

## 第 118 题

**背景**

你使用 Python 编写了一个调用 Azure AI Language 服务的函数：

```python
def get_entities(client, text):
    response = client.recognize_entities(documents=[text])[0]
    return [entity for entity in response.entities]
```

你调用该函数并传入：
> "Our tour of London included a visit to Buckingham Palace."

**题目**

该函数的输出将包含哪些内容？

**选项**

A. Our tour of London included a visit to Buckingham Palace（整个句子）

B. London 和 Buckingham Palace

C. tour 和 visit

D. London only

&nbsp;

---

**参考答案：B**

**解析：**

`recognize_entities`（命名实体识别，NER）会从文本中提取具有语义类型的命名实体：

- **"London"**：地理位置（Location）类型的命名实体 ✅
- **"Buckingham Palace"**：地理位置/地标（Location/Landmark）类型的命名实体 ✅
- "tour"、"visit"：普通动词/名词，不是命名实体 ❌
- 整个句子不会被返回

输出的 `entities` 列表包含 **London** 和 **Buckingham Palace** 两个实体对象，各含类型（Category）、文本（Text）和置信度（ConfidenceScore）属性。

---

## 第 119 题

**背景**

你正在构建一个应用，该应用使用 Azure AI Translator 服务进行文本翻译。你需要将用户输入的文本从检测到的任意语言翻译为英语，且内容必须**保留在美洲地区**（数据主权要求）。

**题目**

应使用哪个 Translator 服务端点 URL 前缀来满足数据主权要求？

**选项**

A. `https://api.cognitive.microsofttranslator.com`（全球端点）

B. `https://api-nam.cognitive.microsofttranslator.com`（北美地区端点）

C. `https://api-eur.cognitive.microsofttranslator.com`（欧洲地区端点）

D. `https://eastus.api.cognitive.microsoft.com`（East US 区域端点）

&nbsp;

---

**参考答案：B**

**解析：**

Azure Translator 提供地区端点以满足数据主权要求：

| 端点 | 覆盖地区 |
|------|---------|
| `api.cognitive.microsofttranslator.com` | 全球（请求路由到最近数据中心） |
| **`api-nam.cognitive.microsofttranslator.com`** | **北美洲（Americas）** |
| `api-eur.cognitive.microsofttranslator.com` | 欧洲 |
| `api-apc.cognitive.microsofttranslator.com` | 亚太 |

题目要求数据保留在**美洲**，应使用 `api-nam`（NAM = North AMericas）端点，确保所有翻译请求在美洲数据中心处理。

---

## 第 120 题

**背景**

你正在使用 Azure AI Vision 的图像分析 API 构建一个应用。应用代码如下（伪代码）：

```python
client = ImageAnalysisClient(endpoint, credential)
result = client.analyze(
    image_url="https://example.com/road.jpg",
    visual_features=[VisualFeatures.CAPTION, VisualFeatures.READ]
)
print(result.caption.text)  # 输出图像描述
print(result.read.blocks)   # 输出 OCR 识别的文本块
```

**题目**

对于以下说法，判断是否正确：

1. 同一次 API 调用可以同时获取图像描述（Caption）和 OCR 文本（Read）
2. `result.caption.text` 返回的是一个字符串
3. `result.read.blocks` 中包含每个检测到的词语的置信度分数

**选项**

A. 1-是，2-是，3-是

B. 1-是，2-是，3-否

C. 1-否，2-是，3-是

D. 1-是，2-否，3-是

&nbsp;

---

**参考答案：A**

**解析：**

1. **正确**：Azure AI Vision 4.0 的 Image Analysis API 支持在**一次调用中**通过 `visual_features` 参数同时请求多个功能（Caption、Read、Objects、Tags 等）
2. **正确**：`caption.text` 返回图像的自然语言描述字符串（如 "A road through a forest"）
3. **正确**：`read.blocks` → `lines` → `words` 中，每个 `word` 对象包含 `confidence` 属性（置信度分数）

---

## 第 121 题

**背景**

你有一个 Azure OpenAI 资源，配置了如下模型设置：
- Temperature：1
- Top P（Top Probabilities）：0.5
- Max response tokens：100

你向模型提问并收到了回答。

**题目**

对于以下说法，判断是否正确：

1. 若将 Temperature 降低到 0，模型的输出将更具确定性
2. 若将 Max response tokens 设置为 50，模型可能会在句子中间截断回答
3. Top P = 0.5 意味着模型每次只考虑概率最高的 50% 的词汇候选

**选项**

A. 1-是，2-是，3-是

B. 1-是，2-是，3-否

C. 1-是，2-否，3-是

D. 1-否，2-是，3-是

&nbsp;

---

**参考答案：A**

**解析：**

1. **正确**：Temperature=0 使模型始终选择概率最高的词汇，输出趋于确定性（贪婪解码）
2. **正确**：`max_tokens` 限制生成的最大 Token 数，若达到上限则立即截断，不考虑语义完整性
3. **正确**：Top P（nucleus sampling）= 0.5 意味着模型的词汇选择范围限制在累计概率达到 50% 的词汇集合中（概率较高的前 N 个词）

---

## 第 122 题

**背景**

你正在构建一个需要对人力资源政策 PDF 进行问答的解决方案。你已经使用 Azure AI Language 创建了一个自定义问题解答（Custom Question Answering）项目，需要通过 cURL 命令测试机器人，确保只有当**置信度分数达到 95% 或以上**时才返回答案。

**题目**

在 cURL 命令的请求体中，应设置哪个参数来实现置信度阈值控制？

**选项**

A. `"confidenceThreshold": 95`

B. `"scoreThreshold": 0.95`

C. `"confidenceScoreThreshold": 95`

D. `"minimumConfidence": 0.95`

&nbsp;

---

**参考答案：B**

**解析：**

Azure AI Language 自定义问题解答 API 的 `generateAnswer` 请求体中，置信度阈值参数为：

```json
{
  "question": "your question",
  "scoreThreshold": 0.95,
  "top": 1
}
```

- 参数名为 **`scoreThreshold`**（而非 confidenceThreshold 或 minimumConfidence）
- 值范围为 **0 到 1**（浮点数），0.95 对应 95%
- 当最高匹配答案的置信度低于此阈值时，API 返回"no good match found"

---

## 第 123 题

**背景**

你正在构建一个聊天机器人，该机器人需要在对话过程中根据用户输入动态调整回答策略。机器人需要引导用户完成**航班预订**流程，并在用户未提供有效出发日期时**反复询问**，直到获得有效日期或用户取消。

**题目**

对于"重复询问直到获得有效输入"的对话逻辑，应使用哪种 Bot Framework 对话类型？

**选项**

A. Skill Dialog（技能对话）

B. Waterfall Dialog（瀑布对话）

C. Adaptive Dialog（自适应对话）

D. Prompt Dialog（提示对话）

&nbsp;

---

**参考答案：D**

**解析：**

**Prompt Dialog（提示对话）** 专门设计用于向用户请求特定类型的输入，并包含**内置的验证和重试逻辑**：

- 若用户输入无效（如日期格式错误），自动重新提示
- 支持自定义验证函数
- 内置重试次数限制和取消处理

Bot Framework SDK 提供多种 Prompt 类型：`DateTimePrompt`（日期时间）、`TextPrompt`（文本）、`ChoicePrompt`（选择）等。

Waterfall Dialog 定义线性步骤流程，但不自动处理输入验证重试；Adaptive Dialog 更灵活但更复杂。

---

## 第 124 题

**背景**

你需要实现一个批量文档翻译解决方案。源文档（德语的 Word 和 PowerPoint 文件）存储在 Azure Blob 容器中，需要翻译为法语，同时满足：

- 保留原始文件格式
- 支持使用**自定义术语表（Custom Glossary）**

**题目**

在完成 Blob 容器准备和文件上传后，还需要按顺序执行哪三项操作？

**选项**（选出三项并排序）

A. 创建 Azure AI Translator 资源

B. 提交批量翻译请求，指定源容器、目标容器、源语言（de）、目标语言（fr）和术语表 URL

C. 将自定义术语表文件（TSV 格式）上传到 Blob 容器

D. 创建用于存储法语文件的目标 Blob 容器

E. 调用翻译状态查询 API，等待翻译完成

&nbsp;

---

**参考答案：C → B → E**

**解析：**

批量文档翻译（Document Translation）的完整流程（假设 Translator 资源和源/目标容器已准备好）：

1. **上传自定义术语表（C）**：将 TSV 格式的术语表文件上传到 Blob 容器，生成 SAS URL 供翻译请求引用
2. **提交翻译请求（B）**：调用 `POST /batches` 端点，在请求体中指定源容器 SAS URL、目标容器 SAS URL、语言对（de→fr）和术语表 SAS URL
3. **查询翻译状态（E）**：批量翻译是异步操作，需要轮询状态直到完成（`status: Succeeded`）

---

## 第 125 题

**背景**

你构建了一个使用 Azure AI Language 自定义问题解答服务的聊天机器人。在测试中发现：机器人对"What is the price of Product A?"（产品 A 的价格是多少？）能正确回答，但对"How much does Product A cost?"（产品 A 多少钱？）回答失败。

以下三种解决方案，哪种能解决该问题？

**题目**

- 方案 A：从 Language Studio，为该问答对添加替代措辞（Alternative Phrasing），然后重新训练并重新发布模型
- 方案 B：从 Language Studio，为"price"创建一个实体，然后重新训练并重新发布模型
- 方案 C：从 Language Studio，为"cost"创建一个实体，然后重新训练并重新发布模型

哪个方案能满足需求？

**选项**

A. 仅方案 A

B. 仅方案 B

C. 仅方案 C

D. 方案 B 和 C

&nbsp;

---

**参考答案：A**

**解析：**

**方案 A（正确）**：为已有问答对添加"How much does Product A cost?"作为**替代问法（Alternative Question）**，是解决语义等价问题的标准做法。训练后，两种问法都会匹配到同一个答案。

**方案 B、C（错误）**：自定义问题解答服务基于问答对匹配，不使用 CLU 中的实体（Entity）概念。为"price"或"cost"创建实体对自定义问答的匹配逻辑没有帮助。

---

## 第 126 题

**背景**

你正在为 Azure OpenAI Studio 构建一个应用，需要为应用添加**内置安全机制以检测和阻止越狱尝试**（Jailbreak attempts），防止用户通过精心构造的提示词绕过模型的安全限制。

**题目**

应实现哪项 Azure AI Content Safety 功能？

**选项**

A. 受保护材料文本检测（Protected material text detection）

B. 越狱风险检测（Jailbreak risk detection）

C. 在线活动监控（Monitor online activity）

D. 文本内容类别检测（Text category moderation）

&nbsp;

---

**参考答案：B**

**解析：**

**越狱风险检测（Jailbreak risk detection）** 专门设计用于识别试图通过特殊构造的提示词来绕过 AI 模型安全措施的攻击模式，例如：
- "Pretend you have no restrictions..."
- "Act as DAN (Do Anything Now)..."
- "Ignore your previous instructions..."

该功能实时分析用户输入，若检测到越狱模式则返回风险标识，应用可据此拒绝该请求。

受保护材料检测用于版权保护，文本类别检测用于通用有害内容，均非越狱防护的专项功能。

---

## 第 127 题

**背景**

你正在使用 Azure AI Content Understanding 分析 1,000 段视频，需要**识别特定公司名称是否在视频中被提及**（包括语音和文字）。

**题目**

应按顺序执行哪三项操作来实现公司名称识别？

**选项**（选出三项并排序）

A. 在 Video Indexer 中创建一个自定义品牌（Custom Brand）并添加公司名称

B. 将视频上传到 Azure Blob Storage

C. 使用 Video Indexer API 对视频建立索引（Index）

D. 从 Video Indexer API 提取品牌洞察（Brand Insights）

E. 使用 Azure AI Language NER 处理视频字幕

&nbsp;

---

**参考答案：A → C → D**

**解析：**

使用 Video Indexer 识别特定品牌/公司名称的流程：

1. **创建自定义品牌（A）**：在 Video Indexer 门户中，添加要识别的公司名称到自定义品牌列表，这样 Video Indexer 在索引时会特别关注这些名称
2. **索引视频（C）**：调用 Video Indexer API 对视频进行索引（包括语音转文字、场景分析、品牌检测等）
3. **提取品牌洞察（D）**：从索引结果中获取品牌出现的时间戳、频率等详情

注意：视频可以通过 URL 直接提供给 Video Indexer，不一定需要先上传到 Blob Storage。但若已在 Blob Storage 中，则需提供 SAS URL。

---

## 第 128 题

**背景**

你有一个 Azure AI 搜索解决方案，使用 Form Recognizer（现 Azure AI Document Intelligence）对采购订单进行索引。你需要**使用 Microsoft Power BI 分析提取的信息**，且解决方案必须**最小化开发工作量**。

**题目**

应向索引器添加什么内容？

**选项**

A. 表投影（Table projection）

B. 投影组（Projection group）

C. 对象投影（Object projection）

D. 文件投影（File projection）

&nbsp;

---

**参考答案：C**

**解析：**

**对象投影（Object projection）** 将富化数据以 JSON 格式存储到 Azure Blob Storage。Power BI 可以直接连接 Blob Storage 中的 JSON 数据并进行分析，无需额外的数据格式转换，开发工作量最小。

- 表投影（A）将数据存储为 Azure Table Storage 格式，Power BI 可以连接，但需要额外配置
- 文件投影（D）主要用于图像/二进制文件，不适合结构化数据分析
- 投影组（B）是包含多种投影的逻辑容器，不是具体的投影类型

---

## 第 129 题

**背景**

你正在使用 Microsoft Bot Framework Composer 构建一个聊天机器人，该机器人需要**向用户呈现带图像的可选选项列表**。

**题目**

应使用哪两个功能来实现此需求？

**选项**

A. Azure 函数（Azure Function）

B. 自适应卡片（Adaptive Card）

C. 实体（Entity）

D. 对话（Dialog）

E. 语料（Utterance）

&nbsp;

---

**参考答案：B、D**

**解析：**

- **自适应卡片（B）**：是实现丰富内容展示的最佳方式，支持在卡片中嵌入图像、按钮、文本等元素，每个选项可以包含图片和描述
- **对话（D）**：用于封装与特定功能相关的交互逻辑，控制何时显示选项列表、如何处理用户的选择

在 Bot Framework Composer 中，通过创建一个 Dialog 来组织交互逻辑，并在其中使用 "Send an Activity" 操作发送包含自适应卡片的响应。

---

## 第 130 题

**背景**

你正在构建一个使用 Azure OpenAI 的聊天机器人。你需要通过 Chat playground 上传公司数据，**确保聊天机器人使用这些数据来回答用户问题**（即 RAG 模式）。

**题目**

在代码中，应如何配置才能让模型使用上传的数据？

**选项**

A. 在 `messages` 数组中添加 `{"role": "system", "content": "Use the provided data to answer questions"}`

B. 使用 `data_sources` 参数指定 Azure AI Search 连接（包含索引名称、连接字符串等）

C. 在 `model` 参数中指定数据集的名称

D. 使用 `grounding_data` 参数指定 Blob 容器的 SAS URL

&nbsp;

---

**参考答案：B**

**解析：**

Azure OpenAI 的"在自有数据上使用"（On Your Data）功能通过 `data_sources` 参数实现：

```python
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "question"}],
    extra_body={
        "data_sources": [{
            "type": "azure_search",
            "parameters": {
                "endpoint": "https://search-resource.search.windows.net",
                "index_name": "your-index",
                "authentication": {"type": "system_assigned_managed_identity"}
            }
        }]
    }
)
```

这会让模型先从 Azure AI Search 索引中检索相关文档，再基于检索到的内容生成答案，实现 RAG 模式。

---

## 第 131 题

**背景**

你正在构建一个文字转语音（TTS）应用，需要为**视力受损的机动车用户**合成清晰的语音。你需要选择合适的 SSML 配置来优化在车载环境中的音效。

**题目**

应配置 SSML 中 `<voice>` 元素的哪个属性？

**选项**

A. `style="calm"`

B. `effect="eq_car"`

C. `pitch="+10%"`

D. `rate="slow"`

&nbsp;

---

**参考答案：B**

**解析：**

`<voice effect="eq_car">` 是 Azure Speech SSML 中专门为**车载环境**优化音频的属性，它应用了针对车内音响特性的均衡器（equalizer）调整，使合成语音在嘈杂的车辆环境中更清晰可辨。

```xml
<voice name="en-US-JennyNeural" effect="eq_car">
  Turn left in 500 meters.
</voice>
```

其他选项（calm 风格、音调、语速）影响的是语音表达方式，而非车载音效优化。

---

## 第 132 题

**背景**

你正在构建一个使用 Azure AI 语言服务的应用，需要对文档中的**个人信息（PII）** 进行识别，特别是要**防止个人数据在分析完成后被持久化存储**。

**题目**

应在 Language 服务 API 请求中配置哪个查询参数？

**选项**

A. `loggingOptOut=true`

B. `piiCategories=none`

C. `showStats=false`

D. `model-version=latest`

&nbsp;

---

**参考答案：A**

**解析：**

`loggingOptOut=true` 参数告知 Azure AI Language 服务**不要将输入数据持久化存储**到微软的日志系统中。这对于处理敏感数据（如医疗记录、财务信息等个人可识别信息）的应用至关重要，可以满足数据隐私合规要求（如 GDPR）。

- `piiCategories`：指定要检测的 PII 类别，不控制数据存储
- `showStats`：控制响应中是否包含统计信息
- `model-version`：指定使用的模型版本

---

## 第 133 题

**背景**

你有一个 Azure AI Language 资源（ta1）和虚拟网络（vnet1）。你需要确保**只有 vnet1 中的资源才能访问 ta1**。

**题目**

应配置什么？

**选项**

A. 为 vnet1 配置网络安全组（NSG）

B. 为 vnet1 配置 Azure Firewall

C. 为 ta1 配置虚拟网络设置

D. 为 ta1 配置 Language 服务容器

&nbsp;

---

**参考答案：C**

**解析：**

**配置 ta1 的虚拟网络设置（C）** 是限制 Azure AI 服务仅对特定 VNet 开放访问的标准方式：

在 Azure 门户 → ta1 → "网络（Networking）" → "防火墙和虚拟网络" → 选择"已选定的网络和私有端点" → 添加 vnet1 的子网

这样只有来自 vnet1 子网的流量才能访问 ta1，互联网和其他 VNet 的请求将被拒绝。

> ⚠️ **注意**：原题（201）答案为 B（Azure Firewall），但 Azure Firewall 通常用于对所有出站/入站流量进行集中管控，配置更复杂。直接在 AI 服务资源的"网络"设置中配置 VNet 规则（C）更简单直接，符合"最小化管理工作量"的通常要求。请以官方考试指南为准。

---

## 第 134 题

**背景**

你正在构建一个使用 Azure AI Agent Service 部署的代理，该代理需要通过调用**自定义 API**（用于获取订单状态）来回答用户问题。你已经用 OpenAPI 规范描述了该 API。

**题目**

在 Azure AI Agent Service 中，应通过什么方式将自定义 API 集成到代理中？

**选项**

A. 创建一个 Azure 函数，在函数中调用 API，然后将函数添加为代理的技能（Skill）

B. 使用 OpenAPI 规范定义函数工具（Function Tool），并将其添加到代理的工具列表

C. 将 API 的端点 URL 添加到代理的系统消息中

D. 在 Language Studio 中创建一个自定义函数实体

&nbsp;

---

**参考答案：B**

**解析：**

Azure AI Agent Service 支持通过**函数工具（Function Tool）** 将自定义 API 集成到代理中：

```python
functions = FunctionTool(functions=[get_order_status_function])
agent = project_client.agents.create_agent(
    model="gpt-4",
    tools=functions.definitions
)
```

通过 OpenAPI 或 Python 函数定义描述 API 的输入/输出格式，代理在对话中自动判断何时调用该函数并将结果整合到回答中。这是 Azure AI Agent Service 的标准集成模式。

---

## 第 135 题

**背景**

你正在评估是否使用 Azure AI Agent Service 构建一个代理。该代理将合并和处理用户上传的多个文件。

你需要了解 Azure AI Agent Service 支持上传文件的最大总大小。

**题目**

用户可以上传到 Azure AI Agent Service 的文件总大小上限是多少？

**选项**

A. 1 GB

B. 10 GB

C. 100 GB

D. 1 TB

&nbsp;

---

**参考答案：C**

**解析：**

根据 Azure AI Agent Service 的服务限制，可以上传到服务的**所有文件的最大总大小为 100 GB**。

单个文件大小通常有独立限制（如 512 MB 或更大），但所有文件累计不超过 100 GB。

这个限制对于评估是否适合大规模文件处理场景（如需要处理 TB 级数据）非常重要。

---

## 第 136 题

**背景**

你正在构建一个 Semantic Kernel 应用，需要在提示词模板中**包含复杂对象**，这些对象含有子属性（sub-properties）。

**题目**

哪两种提示词模板格式支持包含具有子属性的复杂对象？

**选项**

A. Liquid

B. JSONL

C. Handlebars

D. YAML

E. Semantic Kernel（原生 SK 模板）

&nbsp;

---

**参考答案：A、C**

**解析：**

在 Semantic Kernel 中，支持复杂对象（含子属性）的提示词模板格式：

- **Liquid（A）**：一种模板语言，支持通过 `{{ object.property }}` 和 `{{ object.nested.property }}` 访问嵌套属性，以及循环、条件等逻辑
- **Handlebars（C）**：另一种流行的模板语言，支持 `{{object.property}}` 和 `{{#each items}}` 等语法访问复杂对象结构

YAML 是配置文件格式，不是模板引擎；JSONL 是数据格式；Semantic Kernel 原生模板（使用 `{{$variable}}` 语法）对复杂对象的支持有限。

---

## 第 137 题

**背景**

你有一个 Azure AI 订阅，其中包含 Azure AI Document Intelligence 资源（DI1，Standard S0 定价层）。你有以下文件：

- File2.jpg（JPEG 图像）
- File3.tiff（TIFF 图像）

另外还有一个 File1.pdf（PDF 文档）。

**题目**

哪些文件可以使用 DI1 进行分析？

**选项**

A. 仅 File1.pdf

B. 仅 File2.jpg

C. 仅 File3.tiff

D. 仅 File2.jpg 和 File3.tiff

E. File1.pdf、File2.jpg 和 File3.tiff 全部

&nbsp;

---

**参考答案：D**

**解析：**

> ⚠️ **争议说明**：原题（278）答案为 D（File2.jpg 和 File3.tiff），暗示 File1.pdf 不可用。这可能是因为 PDF 文件的某个特定问题（如超过页数限制、加密等），但原题 PDF 中有图表说明了具体限制。

Azure AI Document Intelligence Standard S0 层支持的文件格式包括：
- **PDF**（通常支持，最多 2,000 页/文件）✅
- **JPEG/JPG** ✅
- **PNG** ✅
- **TIFF** ✅
- **BMP**（部分版本支持）

通常情况下三种格式都应该支持。若原题答案为 D，可能是 PDF 文件有特定问题（如超规格），请以原始题目中的文件参数说明为准。

---

## 第 138 题

**背景**

你正在构建一个应用，使用 Azure AI Translator 服务进行实时文本翻译。应用使用 .NET SDK，需要翻译用户输入的文本内容。

**题目**

在代码中，应使用哪个 SDK 客户端类和方法来完成文本翻译请求？

**选项**

A. `TextTranslationClient.TranslateAsync()`

B. `TranslatorClient.TranslateTextAsync()`

C. `CognitiveServicesClient.TranslateAsync()`

D. `TextAnalyticsClient.TranslateAsync()`

&nbsp;

---

**参考答案：A**

**解析：**

Azure AI Translator SDK（`Azure.AI.Translation.Text` NuGet 包）使用以下类和方法进行文本翻译：

```csharp
var client = new TextTranslationClient(new AzureKeyCredential(key), region);
var response = await client.TranslateAsync(
    targetLanguages: new[] { "zh-Hans" },
    content: new[] { "Hello World" }
);
```

- **客户端类**：`TextTranslationClient`
- **翻译方法**：`TranslateAsync()`（或同步版 `Translate()`）

`TextAnalyticsClient` 是 Azure AI Language 服务的客户端，用于情感分析、NER 等，不提供翻译功能。

---

## 第 139 题

**背景**

你有一个 Azure OpenAI 资源，需要构建一个应用来写新闻稿（Press Releases），使用 Azure OpenAI Studio 部署模型。

**题目**

在 Azure OpenAI Studio 中，应按顺序执行哪三项操作来完成部署？

**选项**（选三项并排序）

A. 在 Azure OpenAI Studio 中打开"部署（Deployments）"页面

B. 选择要部署的基础模型（如 GPT-4 或 GPT-3.5）

C. 为部署提供名称并完成部署配置

D. 在 Completions playground 中测试文本生成

E. 创建新的 Azure OpenAI 资源

&nbsp;

---

**参考答案：A → B → C**

**解析：**

在 Azure OpenAI Studio 中部署模型的标准三步流程：

1. **打开 Deployments 页面（A）**：在 Azure OpenAI Studio 左侧导航中选择"Deployments"（部署）
2. **选择基础模型（B）**：点击"Create new deployment"，从可用模型列表中选择适合文本生成的模型（如 GPT-4、GPT-3.5-Turbo）
3. **命名并完成部署（C）**：输入部署名称（供 API 调用时使用），设置容量参数，完成创建

部署完成后可以在 Playground 中测试，但测试（D）不是部署操作的必要步骤。

---

## 第 140 题

**背景**

你需要为 Azure OpenAI 模型配置 ARM 模板，以便能够**部署一个新的 Azure OpenAI 资源**，并确保资源可以生成基于**客户托管密钥（Customer-Managed Key，CMK）** 加密的虚构故事。

**题目**

在 ARM 模板中，除了标准的资源类型（`Microsoft.CognitiveServices/accounts`）和名称外，还需要配置哪个属性来启用 CMK 加密？

**选项**

A. 在 `properties` 中设置 `encryption.keyVaultProperties`（包含 Key Vault URI 和密钥名称）

B. 在 `sku` 中设置 `tier: "Premium"`

C. 在 `properties` 中设置 `customSubDomainName`

D. 在 `identity` 中设置 `type: "SystemAssigned"`

&nbsp;

---

**参考答案：A**

**解析：**

在 ARM 模板中启用 CMK 加密需要在 `properties` 中配置 `encryption` 属性：

```json
{
  "properties": {
    "encryption": {
      "keySource": "Microsoft.KeyVault",
      "keyVaultProperties": {
        "keyVaultUri": "https://your-keyvault.vault.azure.net/",
        "keyName": "your-key-name",
        "keyVersion": "your-key-version"
      }
    }
  }
}
```

同时，资源通常需要系统分配的托管标识（System-Assigned Managed Identity）来访问 Key Vault，但仅有托管标识（D）不足以启用 CMK，还需要 `encryption.keyVaultProperties` 配置。

---

## 第 141 题

**背景**

你有一个含有 DockerFile 的本地开发环境，并有 Azure 订阅中的自定义语音转文字模型（model1）。

你需要在名为 Host1 的 Docker 主机上运行 model1。

**题目**

应按顺序执行哪三项操作？

**选项**（选三项并排序）

A. 从 Azure 门户将 model1 导出为 Docker 容器镜像

B. 在 Host1 上运行容器

C. 配置磁盘日志记录（Configure disk logging）

D. 从 Microsoft Container Registry（MCR）拉取基础镜像

E. 创建新的 Speech 服务资源

&nbsp;

---

**参考答案：A → B → C**

**解析：**

在 Docker 主机上运行自定义语音转文字模型的步骤：

1. **导出 model1（A）**：从 Azure 门户或 Azure CLI 将自定义语音模型导出为容器镜像，使其可以在 Docker 环境中运行
2. **运行容器（B）**：在 Host1 上使用 `docker run` 命令启动容器，包含 Billing 端点和 API 密钥参数
3. **配置日志记录（C）**（可选但推荐）：配置磁盘日志以监控容器的运行状态和性能

---

## 第 142 题

**背景**

你正在使用 Azure AI Speech 服务构建一个应用，该应用将**把英语语音自动翻译成法语、德语和西班牙语**，并输出翻译后的文字。

**题目**

在 Speech Translation 配置代码中，应如何定义输出语言？

**选项**

A. 使用 `translationConfig.AddTargetLanguage()` 分别添加 `"fr"`、`"de"`、`"es"`

B. 使用 `translationConfig.TargetLanguages = new List<string> { "fr-FR", "de-DE", "es-ES" }`

C. 使用 `translationConfig.SetOutputLanguages("fr,de,es")`

D. 在 `SpeechRecognitionLanguage` 中同时指定多个目标语言

&nbsp;

---

**参考答案：A**

**解析：**

Azure Speech Translation SDK 使用 `AddTargetLanguage()` 方法**逐一添加目标翻译语言**：

```csharp
var translationConfig = SpeechTranslationConfig.FromSubscription(key, region);
translationConfig.SpeechRecognitionLanguage = "en-US";  // 源语言
translationConfig.AddTargetLanguage("fr");    // 添加法语
translationConfig.AddTargetLanguage("de");    // 添加德语
translationConfig.AddTargetLanguage("es");    // 添加西班牙语
```

注意：目标语言使用 **ISO 639-1 两字母代码**（如 `"fr"`），而非区域代码（如 `"fr-FR"`）。

---

## 第 143 题

**背景**

你正在构建一个聊天机器人，使用 Microsoft Bot Framework SDK，机器人将引导用户通过一系列固定步骤完成**产品退货申请流程**（依次询问：订单号 → 退货原因 → 偏好退款方式）。

**题目**

哪种对话类型最适合实现这个有序、固定步骤的对话流程？

**选项**

A. Prompt Dialog

B. Waterfall Dialog（瀑布对话）

C. Adaptive Dialog（自适应对话）

D. Component Dialog（组件对话）

&nbsp;

---

**参考答案：B**

**解析：**

**瀑布对话（Waterfall Dialog）** 定义了一系列有序执行的步骤（Steps），非常适合固定流程的线性引导：

```csharp
var waterfallSteps = new WaterfallStep[]
{
    AskOrderNumberStepAsync,    // 步骤1：询问订单号
    AskReturnReasonStepAsync,   // 步骤2：询问退货原因
    AskRefundPreferenceStepAsync, // 步骤3：询问退款偏好
    FinalStepAsync              // 步骤4：提交并确认
};
AddDialog(new WaterfallDialog(nameof(WaterfallDialog), waterfallSteps));
```

每个步骤完成后自动进入下一步，非常直观。

Adaptive Dialog 支持事件驱动，更适合复杂分支逻辑；Prompt 用于单个输入请求；Component 用于封装复用的对话模块。

---

## 第 144 题

**背景**

你正在使用 Bot Framework SDK 开发一个聊天机器人。当机器人加入对话时，需要**主动向新加入的用户发送欢迎消息**。

**题目**

在机器人的代码中，应重写（Override）哪个方法来实现这个逻辑？

**选项**

A. `OnMessageActivityAsync`

B. `OnMembersAddedAsync`

C. `OnConversationUpdateActivityAsync`

D. `OnTurnAsync`

&nbsp;

---

**参考答案：B**

**解析：**

**`OnMembersAddedAsync`** 是 `ActivityHandler` 类中专门处理"新成员加入对话"事件的方法。当用户（或机器人自身）加入对话时，该方法被触发，开发者可以在这里实现欢迎消息逻辑：

```csharp
protected override async Task OnMembersAddedAsync(
    IList<ChannelAccount> membersAdded,
    ITurnContext<IConversationUpdateActivity> turnContext,
    CancellationToken cancellationToken)
{
    foreach (var member in membersAdded)
    {
        if (member.Id != turnContext.Activity.Recipient.Id)
        {
            await turnContext.SendActivityAsync(MessageFactory.Text("Welcome!"));
        }
    }
}
```

`OnMessageActivityAsync` 处理用户发送的消息，不适合欢迎逻辑。

---

## 第 145 题

**背景**

你有一个 Azure 认知搜索（Azure Cognitive Search）服务，其中一个使用主管理密钥的 Web 应用在安全审查中发现主密钥可能已被泄露，存在未授权的**索引管理操作**。

你需要防止未授权访问，且解决方案必须**最小化停机时间**。

**题目**

应按顺序执行哪些步骤？

**选项**（排序）

A. 重新生成辅助管理密钥

B. 将应用更改为使用辅助管理密钥

C. 重新生成主管理密钥（使旧密钥失效）

D. 立即删除主管理密钥

E. 将所有查询切换为只读查询密钥

&nbsp;

---

**参考答案：A → B → C**

**解析：**

零停机轮换管理密钥的正确流程：

1. **重新生成辅助管理密钥（A）**：此时应用仍使用主密钥正常运行，生成新的辅助密钥作为切换目标
2. **将应用切换到辅助管理密钥（B）**：更新应用配置，使用新的辅助密钥，应用继续正常运行（无停机）
3. **重新生成主管理密钥（C）**：旧的泄露主密钥失效，未授权访问被终止

注意：不能直接删除管理密钥（D），Azure 认知搜索服务始终保持两个管理密钥；切换到查询密钥（E）会导致索引管理功能不可用。

---

## 第 146 题

**背景**

你正在使用 Azure AI 服务构建一个处理工厂流水线检测的监控系统，需要对多个相关传感器（转速、角度、温度、压力）的数据进行**综合异常检测**，当出现跨传感器联合异常时生成警报。

**题目**

解决方案中应包含哪个组件？

**选项**

A. Application Insights（应用程序洞察）

B. Azure Monitor 中的指标警报

C. 多变量异常检测（Multivariate Anomaly Detection）

D. 单变量异常检测（Univariate Anomaly Detection）

&nbsp;

---

**参考答案：C**

**解析：**

当多个传感器之间**存在物理关联性**时（如发动机的温度和转速通常同步变化），仅靠单独分析每个传感器（单变量）无法发现"温度正常但压力异常低"这类跨传感器复合异常。

**多变量异常检测（Multivariate Anomaly Detection）** 通过同时分析多条时间序列之间的相关性，能够发现这类组合异常，更适合工业设备监控场景。

单变量异常检测适合独立分析单一时间序列（如电力消耗曲线），不能捕获跨传感器的联合异常。

---

## 第 147 题

**背景**

你正在构建一个面向客户的语音通话处理机器人，该机器人使用 Azure AI Speech 服务。你需要配置机器人以支持**语音交互**，且解决方案必须**支持多个客户端应用**（如网页、移动 App、智能音箱）。

**题目**

应为机器人使用哪种频道（Channel）类型？

**选项**

A. Cortana 频道

B. Microsoft Teams 频道

C. Direct Line Speech 频道

&nbsp;

---

**参考答案：C**

**解析：**

**Direct Line Speech 频道** 是 Bot Framework 中专门为语音交互设计的频道，特点是：

- 与 Azure AI Speech 服务深度集成，支持语音输入/输出
- 支持多种客户端（网页 SDK、移动 SDK、IoT 设备等）
- 提供低延迟的实时双向语音通信

- **Cortana 频道**（A）：已被微软逐步淘汰，2021 年后不再支持新应用接入
- **Microsoft Teams 频道**（B）：支持语音（通话），但主要针对 Teams 内的协作场景，不是通用的多客户端语音解决方案

---

## 第 148 题

**背景**

你有一个 Azure AI Content Safety 资源，需要对用户生成的文本消息进行内容审核，特别是识别**攻击性语言和性暗示语言**。

**题目**

在调用 Content Moderator Text Moderation API 时，需要配置哪三个参数/设置？

**选项**（选三项）

A. 设置 `language` 参数为 `"eng"`（英语）

B. 启用 `classify` 功能（返回三类内容类别）

C. 启用 `autocorrect` 自动纠错

D. 设置最低置信度阈值（Score threshold）

E. 在 API 请求头中包含 `Ocp-Apim-Subscription-Key`

&nbsp;

---

**参考答案：A、B、E**

**解析：**

调用 Content Moderator Text Moderation API 的必要配置：

- **`language`（A）**：指定文本语言（如 `"eng"`），有助于提高检测准确率
- **`classify=true`（B）**：启用三类内容分类（Category1：成人，Category2：性暗示，Category3：冒犯性），返回各类别的置信度分数
- **`Ocp-Apim-Subscription-Key`（E）**：API 认证头，必须包含在所有 Content Moderator API 请求中

`autocorrect`（C）是可选的拼写纠错功能，不是必须配置的检测参数；置信度阈值（D）由调用方在接收响应后自行判断，不是 API 参数。

---

## 第 149 题

**背景**

你在分析一段对话文本，使用了 Azure AI Language 的 Named Entity Recognition（NER）功能。分析结果以 JSON 响应返回，其中包含识别到的实体信息。

**题目**

以下关于 NER API 响应的说法，哪项正确？

**选项**

A. 每个实体只属于一种类别（Category），不会同时属于多个类别

B. 响应中包含实体在原文中的起始偏移量（offset）和长度（length）

C. NER API 响应中包含每个实体对应的 Wikipedia 链接

D. NER 可以识别超过 200 种不同的实体类别

&nbsp;

---

**参考答案：B**

**解析：**

Azure AI Language NER API 的响应中，每个实体包含：
- `text`：实体文本内容
- `category`：实体类别（如 Person、Location、Organization 等）
- `subcategory`：子类别（可选）
- **`offset`**：实体在原文中的起始字符位置 ✅
- **`length`**：实体文本的字符长度 ✅
- `confidenceScore`：置信度

- Wikipedia 链接属于**实体链接（Entity Linking）** API 的功能，而非 NER
- NER 实体每次识别只有一个主类别（Category）
- NER 支持的实体类别约为 20+ 种（如 Person、Location、Organization、DateTime、Quantity 等），不是 200+

---

## 第 150 题

**背景**

你是一家零售公司的 AI 工程师，正在构建一个使用 Azure OpenAI 的智能客服系统。系统使用 GPT-4 模型，当用户询问某产品的库存状态时，系统需要实时查询数据库。

你需要实现这一功能，且**最小化开发工作量**。

**题目**

应使用 Azure OpenAI 的哪种功能来实现实时数据库查询？

**选项**

A. 微调（Fine-tuning）：将数据库内容作为训练数据

B. 函数调用（Function Calling）：定义查询数据库的函数，让模型决定何时调用

C. 提示词工程：在系统消息中包含完整的产品库存数据

D. RAG 模式：将所有库存数据索引到 Azure AI Search

&nbsp;

---

**参考答案：B**

**解析：**

**函数调用（Function Calling）** 是 Azure OpenAI 中允许模型在对话中**主动决定调用外部函数**的功能：

1. 在 API 请求中定义函数（如 `query_inventory(product_id)`）的名称、描述和参数
2. 当用户询问库存时，模型生成函数调用请求（包含参数）
3. 应用执行实际的数据库查询
4. 将查询结果返回给模型，模型生成最终回答

这种方式支持实时查询（数据不需要预先索引），开发工作量小，是标准的 AI + 数据库集成模式。

---

## 第 151 题

**背景**

你有一个 Azure AI Foundry Content Safety 资源（resource1），需要构建一个应用来**识别包含仇恨内容的文本**。

**题目**

在应用代码中，应使用哪个客户端类和方法来调用 Content Safety API 检测仇恨内容？

**选项**

A. `ContentSafetyClient.AnalyzeTextAsync()`，在请求中设置 `categories: ["Hate"]`

B. `TextAnalyticsClient.AnalyzeSentimentAsync()`，检查负面情感分数

C. `ContentModerator.TextModeration.ScreenText()`，设置分类类别

D. `AzureOpenAIClient.ChatCompletion()`，在系统消息中要求检测仇恨内容

&nbsp;

---

**参考答案：A**

**解析：**

Azure AI Content Safety SDK 使用 `ContentSafetyClient.AnalyzeTextAsync()` 方法分析文本内容，通过 `categories` 参数指定要检测的类别：

```python
from azure.ai.contentsafety import ContentSafetyClient
from azure.ai.contentsafety.models import AnalyzeTextOptions, TextCategory

client = ContentSafetyClient(endpoint, credential)
request = AnalyzeTextOptions(
    text="user input text",
    categories=[TextCategory.HATE]
)
response = client.analyze_text(request)
hate_result = response.categories_analysis[0]  # Hate 类别的得分
```

`TextAnalyticsClient` 是 Azure AI Language 的客户端，情感分析和仇恨检测是不同功能。

---

## 第 152 题

**背景**

你在 Azure AI Language 服务的文本处理中，使用以下 C# 代码进行实体识别：

```csharp
var response = client.RecognizeEntities(
    "Our tour of Paris included a visit to the Eiffel Tower."
);
var entities = response.Value.Entities;
```

**题目**

该代码的输出将包含哪些实体？

**选项**

A. Our tour of Paris included a visit to the Eiffel Tower（整个句子）

B. Paris 和 Eiffel Tower

C. tour 和 visit

D. Paris only

&nbsp;

---

**参考答案：B**

**解析：**

`RecognizeEntities`（命名实体识别）从文本中识别命名实体：

- **"Paris"**：地理位置实体（Location）✅
- **"Eiffel Tower"**：地理位置/地标实体（Location）✅
- "tour"、"visit"：普通名词/动词，不是命名实体
- 整个句子不会作为实体返回

输出的 `entities` 集合包含两个实体对象，各有 `Text`、`Category`、`ConfidenceScore` 等属性。

---

## 第 153 题

**背景**

你正在构建一个应用，使用 Azure AI Translator 的文档翻译（Document Translation）功能，将 Word 和 PowerPoint 文档从德语翻译为法语，同时保留格式。

**题目**

以下关于文档翻译服务（Document Translation）的说法，哪项正确？

**选项**

A. 文档翻译仅支持 TXT 和 HTML 格式，不支持 DOCX 或 PPTX

B. 文档翻译是同步操作，API 调用会立即返回翻译结果

C. 文档翻译支持 Word（.docx）、PowerPoint（.pptx）等格式，并保留原始格式

D. 文档翻译无法使用自定义术语表

&nbsp;

---

**参考答案：C**

**解析：**

Azure AI Translator **文档翻译（Document Translation）** 服务的特点：

- **支持格式**：.docx、.pptx、.xlsx、.pdf、.html、.txt 等多种文档格式 ✅
- **保留格式**：翻译后保持原始文档的布局、字体、样式等 ✅
- **异步操作**：大型文档翻译是异步批处理任务，需要轮询状态
- **支持自定义术语表**：可以上传 TSV/XLIFF 格式的术语表，确保专业术语翻译的一致性 ✅

---

## 第 154 题

**背景**

你正在使用 Azure AI Language 服务处理文本，使用以下函数：

```python
def process_text(client, text):
    result = client.extract_key_phrases([text])[0]
    return result.key_phrases
```

调用时传入：`"Our tour of Paris included a visit to the Eiffel Tower."`

**题目**

该函数的返回值将包含什么？

**选项**

A. `["Our tour", "Paris", "visit", "Eiffel Tower"]`

B. `["Paris", "Eiffel Tower"]`

C. `["tour", "Paris", "Eiffel Tower"]`

D. `["Paris", "Eiffel Tower", "tour"]`

&nbsp;

---

**参考答案：B**

**解析：**

Key Phrase Extraction（关键短语提取）从文本中提取**语义上最重要的短语**，过滤掉停用词和功能性词汇：

- **"Paris"**：高语义价值的地名关键词 ✅
- **"Eiffel Tower"**：高语义价值的地标名称关键词 ✅
- "Our tour"、"visit"：相对通用的短语，关键性较低，通常不被提取

注意：关键短语提取与 NER 不同，它关注文本的主题重点，不局限于命名实体类别。具体提取结果可能因模型版本略有差异，但 Paris 和 Eiffel Tower 是最典型的关键短语。

---

## 第 155 题

**背景**

你正在构建一个 Azure AI Foundry 中的代理，需要查询 Azure AI Search 索引中的数据来回答用户问题。

**题目**

在代理代码中，需要初始化 `AzureAISearchTool` 工具，以下哪些参数是必须提供的？

**选项**（选两项）

A. 搜索服务的连接 ID（Connection ID）

B. Azure AI Search 索引的名称（Index Name）

C. 搜索服务的管理员密钥（Admin Key）

D. 要搜索的字段列表（Field Names）

E. 搜索结果的最大数量（Top K）

&nbsp;

---

**参考答案：A、B**

**解析：**

`AzureAISearchTool` 的最小必要配置：

```python
from azure.ai.projects.models import AzureAISearchTool

search_tool = AzureAISearchTool(
    index_connection_id=ai_search_connection.id,  # 必须：连接 ID
    index_name="your-index-name"                  # 必须：索引名称
)
```

- **连接 ID（A）**：通过 AI Foundry 项目中预先创建的连接（Connection）提供，包含认证信息（无需直接传入 Admin Key）
- **索引名称（B）**：指定要搜索的具体索引

管理员密钥（C）通过连接对象隐式传递，不需要直接在工具中指定；字段列表（D）和 Top K（E）是可选配置参数。

---

## 第 156 题

**背景**

你正在构建一个通话处理系统，来电可能是法语或德语用户。系统必须：

- 实时识别来电语言
- 根据语言将通话路由到对应的支持团队

**题目**

应使用哪个 Azure AI 服务来**实时识别通话中的语言**？

**选项**

A. Azure AI Speech（语音转文字 + 语言识别）

B. Azure AI Language（语言检测 API）

C. Azure AI Translator（语言检测功能）

D. Azure AI Content Safety

&nbsp;

---

**参考答案：A**

**解析：**

通话是**音频流**，需要先进行语音识别（Speech-to-Text）才能分析语言。**Azure AI Speech 服务**提供内置的语言识别功能（Auto Language Detection），可以在语音转文字的同时自动检测说话者使用的语言：

```python
auto_detect_config = AutoDetectSourceLanguageConfig(
    languages=["fr-FR", "de-DE"]
)
```

- Azure AI Language 的语言检测（B）处理的是**文本**输入，不能直接处理音频
- Translator（C）的语言检测也是文本处理，不适用于音频流

对于实时通话场景，需要先将语音转为文字再检测语言，Azure AI Speech 的实时语言检测是最直接的方案。

---

## 第 157 题

**背景**

你有一个 Azure AI Video Indexer 账户，需要构建一个页面来展示公司内部会议的视频。页面嵌入了 Player 小部件和 Cognitive Insights 小部件。

你需要配置这两个小部件，满足以下要求：
- 允许用户搜索关键词
- 在视频中显示人物姓名和面孔
- 以英语（美国）显示字幕

**题目**

以下说法关于 Widget 配置 URL 参数的哪个组合是正确的？

**选项**

A. 关键词搜索由 Cognitive Insights Widget 提供，人物显示由 Player Widget 控制，字幕语言参数为 `captions=en-US`

B. 关键词搜索和字幕都由 Player Widget 控制，人物识别由 Cognitive Insights Widget 提供，字幕参数为 `language=en-US`

C. 关键词搜索和人物显示都在 Cognitive Insights Widget 中配置，字幕在 Player Widget 中通过 `language=en-US` 参数设置

D. Player Widget 负责字幕，Cognitive Insights Widget 负责关键词搜索和人物信息，两者都支持 `language=en-US` 参数

&nbsp;

---

**参考答案：C**

**解析：**

Video Indexer Widget 功能分工：

- **Player Widget**：负责视频播放和字幕显示，通过 URL 参数 `language=en-US` 设置字幕语言
- **Cognitive Insights Widget**：负责显示 AI 分析结果，包括：
  - 关键词（Keywords）搜索
  - 人物（People）识别与显示
  - 情感、话题、品牌等其他洞察

两个 Widget 通过 `videoId` 同步，Player 中的播放位置变化会同步到 Cognitive Insights 的时间线。

---

## 第 158 题

**背景**

你的公司使用 Azure Cognitive Services 解决方案进行人脸检测，检测方法如下：

```csharp
var faceAttributes = new FaceAttributeType[] {
    FaceAttributeType.Glasses,
    FaceAttributeType.HeadPose
};
IList<DetectedFace> faces = await faceClient.Face.DetectWithUrlAsync(
    imageUrl, returnFaceAttributes: faceAttributes
);
```

你发现该方案**经常无法检测到模糊图像和侧脸图像**中的人脸。

**题目**

应如何提高对模糊图像和侧脸的检测能力？

**选项**

A. 使用 Face API 的更新版本

B. 使用 Computer Vision 服务替代 Face 服务

C. 使用 Identify 方法替代 Detect 方法

D. 更改检测模型（Detection Model）

&nbsp;

---

**参考答案：D**

**解析：**

Azure Face API 提供多个**检测模型（Detection Models）**，针对不同场景优化：

| 模型 | 特点 |
|------|------|
| `detection_01` | 默认模型，适合常规正面人脸 |
| `detection_02` | 对模糊图像和非正面（侧脸）有改善 |
| `detection_03` | 最新模型，进一步提升了对小人脸、遮挡和侧脸的检测能力 |

将 `detectionModel` 参数从默认值改为 `detection_03`，可以显著提高对模糊图像和侧脸的检测率，无需更换服务。

---

## 第 159 题

**背景**

你需要为 Azure AI 搜索构建一个富化管道，对大量扫描文档进行 OCR 文字提取，然后在搜索索引中实现全文搜索。

**题目**

应在技能集中包含哪个内置技能来实现 OCR 文字提取？

**选项**

A. 关键短语提取技能（Key Phrase Extraction Skill）

B. 光学字符识别技能（OCR Skill）

C. 文档提取技能（Document Extraction Skill）

D. 图像分析技能（Image Analysis Skill）

&nbsp;

---

**参考答案：B**

**解析：**

**OCR Skill（光学字符识别技能）** 是 Azure AI Search 内置技能集中专门用于从扫描文档、图像等中提取文字的技能：

```json
{
  "@odata.type": "#Microsoft.Skills.Vision.OcrSkill",
  "detectOrientation": true,
  "inputs": [{ "name": "image", "source": "/document/normalized_images/*" }],
  "outputs": [{ "name": "text", "targetName": "rawText" }]
}
```

它调用 Azure Computer Vision 的 Read API 进行 OCR，支持多语言文本提取，是扫描文档全文搜索的必要技能。

Document Extraction Skill 用于从文件容器中提取内容；Image Analysis Skill 用于图像理解（标签、描述等），不专注于文字提取。

---

## 第 160 题

**背景**

你有一个 Azure AI Content Safety 资源（resource1）和一个存储账户（storage1），其中有一个 Blob 容器（container1）包含示例图像文件。

你运行了如下 cURL 命令来检测图像中的潜在暴力内容，提交的测试图像仅包含一个**圆圈（circle）**。

**题目**

期望的输出结果是什么？

**选项**

A. 0（暴力内容得分为 0，表示未检测到暴力内容）

B. 0.0（浮点数形式的 0）

C. 7（最高严重性得分）

D. 100（百分比形式）

&nbsp;

---

**参考答案：A**

**解析：**

Azure AI Content Safety 图像分析 API 返回每个安全类别的**严重性得分（整数 0-7）**：

- **0**：无检测到的该类别内容
- 2、4、6：轻度、中度、重度
- **7**：最高严重性

对于只包含简单几何图形（圆圈）的测试图像，**暴力内容（Violence）** 类别的得分应为 **0**，表示没有检测到任何暴力相关内容。

---

## 第 161 题

**背景**

你有一个自定义 Azure AI Document Intelligence 模型，用于识别合同文档。你需要**支持新的合同格式**，且解决方案必须**最小化开发工作量**。

**题目**

应采取什么措施？

**选项**

A. 降低 App1 的置信度阈值

B. 降低 App1 的准确度阈值

C. 将新的合同格式样本添加到现有训练集中，然后重新训练模型

D. 创建一个新的训练集，并添加新的合同格式

E. 创建并训练一个全新的自定义模型

&nbsp;

---

**参考答案：C**

**解析：**

**增量训练（Incremental Training）** 是扩展已有模型能力的最小工作量方式：

1. 准备新合同格式的标注示例（至少 5 个样本）
2. 将新样本添加到**现有训练集**中
3. 使用扩充后的数据集**重新训练**现有模型

这样模型可以在保留原有格式识别能力的同时，学习识别新的合同格式，不需要从头创建新模型（代价最大）。

---

## 第 162 题

**背景**

你正在使用 Azure OpenAI Chat playground 构建一个聊天机器人，需要确保机器人**生成简洁的正式商务语言文本**，同时：

- 降低语言模型的运行成本
- 保持聊天历史窗口（Context Window）大小不变

**题目**

应配置哪两项设置？

**选项**

A. 修改系统消息（System Message），要求使用简洁正式语言

B. 降低最大响应 Token 数（Max response tokens）

C. 将模型更换为更小的版本（如从 GPT-4 切换至 GPT-3.5）

D. 降低 Temperature 到 0

E. 增加 Top P 到 1.0

&nbsp;

---

**参考答案：A、B**

**解析：**

- **系统消息（A）**：通过明确指示模型使用"简洁正式的商务语言"，直接控制输出风格，是最直接的方法
- **降低最大响应 Token 数（B）**：简洁回答意味着更少的 Token，降低 `max_tokens` 限制可以直接减少每次调用消耗的 Token，从而降低成本。同时，历史窗口大小（由 `max_context_tokens` 控制，默认保持不变）不受影响

更换模型（C）也可以降低成本，但可能影响输出质量，且题目未提及允许降低质量。

---

## 第 163 题

**背景**

你正在为客户支持聊天机器人配置功能，需要识别以下两类内容：

- **公司产品代码名（Code names）**：如内部研发中的产品别名（非标准词汇）
- **信用卡号码**：需要检测并阻止客户意外分享的信用卡信息

解决方案必须**最小化开发工作量**。

**题目**

应为这两项需求分别使用 Azure Cognitive Service for Language 的哪个功能？

**选项**

A. 产品代码名→命名实体识别（NER）；信用卡号→个人信息识别（PII Detection）

B. 产品代码名→自定义命名实体识别（Custom NER）；信用卡号→个人信息识别（PII Detection）

C. 产品代码名→关键短语提取；信用卡号→情感分析

D. 产品代码名→实体链接；信用卡号→关键短语提取

&nbsp;

---

**参考答案：B**

**解析：**

- **产品代码名**：是公司内部专有名词，不在标准 NER 识别范围内，需要**自定义命名实体识别（Custom NER）** 进行训练和识别
- **信用卡号**：属于个人可识别信息（PII），Azure AI Language 的 **PII Detection** 内置了对信用卡号（`CreditCardNumber` 类别）的检测，无需自定义训练，开发工作量最小

这两种功能都在 Azure AI Language 服务中提供，可以在同一个服务实例中调用。

---

## 第 164 题

**背景**

你需要为应用配置 Azure AI Language 服务，以识别文本中的**温度值**（如 "25 degrees Celsius"）、**货币值**（如 "$150"）、**电子邮件地址**和**电话号码**。解决方案必须**最小化开发工作量**。

**题目**

应使用哪种模型能力？

**选项**

A. 列表实体（List Entities）

B. 学习实体（Learned Entities）

C. 语料（Utterances）

D. 正则表达式组件（Regular Expression Components）

E. 预构建实体组件（Prebuilt Entity Components）

&nbsp;

---

**参考答案：E**

**解析：**

Azure AI Language（LUIS / CLU）提供多种**预构建实体（Prebuilt Entities）**，无需自定义训练即可识别常见数据类型：

| 预构建实体 | 识别内容 |
|-----------|---------|
| `Temperature` | 温度值（25°C、100°F 等） |
| `Currency` | 货币值（$150、€200 等） |
| `Email` | 电子邮件地址 |
| `PhoneNumber` | 电话号码 |

直接在项目中添加这些预构建实体组件即可立即使用，无需准备标注数据或训练，开发工作量最小。

---

## 第 165 题

**背景**

你构建了一个 Conversational Language Understanding（CLU）模型，在测试中发现：用户提出的一些**与模型能力无关的随意问题**时，模型返回了错误的意图匹配结果（而非识别为"不支持的请求"）。

**题目**

应采取什么措施来确保模型能正确识别这些无关请求？

**选项**

A. 启用主动学习（Active Learning）

B. 向自定义意图添加更多示例语料

C. 向 None 意图添加示例语料（None Intent Examples）

D. 添加更多实体

&nbsp;

---

**参考答案：C**

**解析：**

> ⚠️ **注意**：原题（165）答案为 A（Enable Active Learning），但从场景分析，**添加 None 意图示例（C）** 是解决"模型错误匹配无关请求"问题的直接方案：

**None 意图**（也称为回退意图）用于识别模型不应该处理的请求。向 None 意图添加足够多样的无关示例语料，可以训练模型在遇到不相关问题时返回低置信度或 None 意图，而不是错误地匹配到某个自定义意图。

启用主动学习（A）是从生产流量中改进模型的长期策略，不能立即解决现有的错误分类问题。

---

## 第 166 题

**背景**

你正在构建一个问答机器人，使用 Azure AI Language 自定义问答服务。你需要通过 Language Studio 配置机器人支持**多轮对话（Multi-turn Conversations）**，使机器人能够根据上下文提供跟进问题选项。

**题目**

应在 Language Studio 中执行哪项操作来启用多轮对话？

**选项**

A. 添加替代问法（Add alternate questions）

B. 启用主动学习（Enable active learning）

C. 添加跟进提示（Add follow-up prompts）

D. 启用闲聊（Enable chit-chat）

&nbsp;

---

**参考答案：C**

**解析：**

**跟进提示（Follow-up Prompts）** 是实现多轮对话的核心功能。为每个问答对配置跟进提示后：

- 当用户触发某个答案时，机器人会显示相关的后续问题选项
- 用户可以点击选项继续深入探讨，形成多轮对话树

例如，用户问"如何重置密码？"→ 机器人回答后显示跟进提示：
- "通过邮件重置"
- "通过手机验证码重置"
- "联系管理员"

---

## 第 167 题

**背景**

你正在使用 Azure AI Speech 服务的 Speech SDK 构建一个**流式音频实时转录**应用，使用 MP3 编码格式。

**题目**

在 Speech SDK 代码中，应使用什么配置类来支持 MP3 压缩音频格式的输入流？

**选项**

A. `AudioConfig.FromStreamInput(stream)` 默认配置

B. `AudioConfig.FromStreamInput(stream, AudioStreamFormat.GetCompressedFormat(AudioStreamContainerFormat.MP3))`

C. `SpeechConfig.SetProperty(PropertyId.SpeechServiceConnection_RecoLanguage, "mp3")`

D. `AudioConfig.FromWavFileInput("audio.mp3")`

&nbsp;

---

**参考答案：B**

**解析：**

默认的 Audio Config 假设输入为 WAV PCM 格式。要处理 MP3 等压缩格式，需要显式指定音频流格式：

```csharp
var compressedFormat = AudioStreamFormat.GetCompressedFormat(AudioStreamContainerFormat.MP3);
var audioConfig = AudioConfig.FromStreamInput(pushStream, compressedFormat);
```

`GetCompressedFormat()` 方法接受 `AudioStreamContainerFormat` 枚举值，支持 MP3、OPUS、OGG 等压缩格式。

若直接使用默认 `FromStreamInput(stream)` 处理 MP3 文件，会因格式不匹配而导致转录失败或错误结果。

---

## 第 168 题

**背景**

你正在使用 C# 构建一个应用，该应用调用 Azure AI Language 的关键短语提取功能，并使用以下代码：

```csharp
var response = textAnalyticsClient.ExtractKeyPhrases(
    "the cat sat on the mat"
);
foreach (string keyPhrase in response.Value.KeyPhrases)
{
    Console.WriteLine(keyPhrase);
}
```

**题目**

判断以下说法是否正确：

1. 该方法会返回关键短语列表
2. "the" 会被作为关键短语返回
3. 每个关键短语都会附带置信度分数

**选项**

A. 1-是，2-是，3-是

B. 1-是，2-否，3-否

C. 1-否，2-否，3-是

D. 1-是，2-是，3-否

&nbsp;

---

**参考答案：B**

**解析：**

1. **正确**：`ExtractKeyPhrases` 方法确实返回关键短语列表（`KeyPhrases` 集合）
2. **错误**："the" 是英语中最常见的停用词（stop word），没有独立语义意义，不会被作为关键短语提取。对于 "the cat sat on the mat"，可能提取 "cat" 和 "mat" 等有意义的词
3. **错误**：关键短语提取 API **不返回置信度分数**，只返回短语文本字符串列表。（与情感分析不同，情感分析会返回置信度分数）

---

## 第 169 题

**背景**

你有一个使用 Azure AI 视觉服务（Computer Vision）的应用，应用需要对产品照片使用**智能裁剪（Smart Cropping）** 功能生成不同尺寸的缩略图。

你有一个名为 `contoso1` 的 Computer Vision 资源，部署在 West US 区域。

**题目**

调用智能裁剪功能的正确 API URL 格式是什么？

**选项**

A. `POST https://westus.api.cognitive.microsoft.com/vision/v3.1/generateThumbnail?width=500&height=500&smartCropping=True`

B. `GET https://westus.api.cognitive.microsoft.com/vision/v3.1/generateThumbnail?width=500&height=500`

C. `POST https://contoso1.cognitiveservices.azure.com/vision/v3.1/smartCrop?width=500&height=500`

D. `POST https://westus.api.cognitive.microsoft.com/vision/v3.1/analyze?visualFeatures=Thumbnail`

&nbsp;

---

**参考答案：A**

**解析：**

Computer Vision 的智能裁剪（Smart Cropping）功能使用 `generateThumbnail` 端点：

```
POST https://{region}.api.cognitive.microsoft.com/vision/v3.1/generateThumbnail
    ?width={width}&height={height}&smartCropping={true/false}
```

- HTTP 方法：**POST**（在请求体中提供图像 URL 或二进制数据）
- 端点：`generateThumbnail`（而非 analyze）
- 关键参数：`smartCropping=True`（启用 AI 智能裁剪，保留图像重要区域）

---

## 第 170 题

**背景**

你正在构建一个监控工厂生产线的系统，需要检测工人是否正确穿戴个人防护装备（PPE，如口罩和安全眼镜）。系统要求：

- 识别未戴口罩或安全眼镜的员工
- 每 15 分钟执行一次合规检查
- 最小化开发工作量
- 最小化成本

**题目**

应使用哪个 Azure AI 服务？

**选项**

A. Face 服务（Azure Face API）

B. Computer Vision（Azure AI Vision）

C. Azure Video Analyzer for Media（原 Video Indexer）

&nbsp;

---

**参考答案：A**

**解析：**

**Azure Face 服务** 提供人脸检测和面部属性分析功能，可以检测以下遮挡属性（`FaceAttributeType.Occlusion`）：
- `faceCovered`：面部是否被遮挡（如口罩）
- `eyeOccluded`：眼部是否被遮挡（如安全眼镜）

这可以直接用于检测员工是否穿戴了 PPE，无需自定义训练，是最简单的实现方式。

> ⚠️ **注意**：Azure Face 服务中涉及人脸识别的高级功能（如人员识别）需要申请访问权限；但基础的人脸检测和属性分析功能通常无需特别申请。Computer Vision 也能进行物体检测，但对 PPE 合规检测不如 Face API 精准。

---

*第 101–170 题整理完毕。*

---

## 第 171 题

**背景**

你需要使用 Azure OpenAI Studio 对 GPT-4 模型进行图像分析。你需要在 Azure OpenAI Studio 中配置模型以获取图像的文字描述。

**题目**

在 Azure OpenAI Studio 中，应按顺序执行哪四项操作？

**选项**（选四项并排序）

A. 创建新部署，选择 GPT-4 模型，设置模型版本为 `vision-preview`

B. 打开 Chat playground 并选择已部署的模型

C. 在 System message 字段中输入："You are an AI assistant that describes images."

D. 在 Chat session 窗格中输入提示词"Describe this image"，并通过附件按钮上传图像

E. 在 Completions playground 中粘贴图像的 Base64 编码

&nbsp;

---

**参考答案：A → B → C → D**

**解析：**

使用 Azure OpenAI Studio 分析图像的完整流程：

1. **部署 GPT-4 Vision 模型（A）**：必须选择支持视觉功能的 GPT-4 模型版本（`vision-preview` 或 `gpt-4o`）
2. **打开 Chat playground（B）**：图像分析通过聊天界面进行，而非 Completions playground
3. **设置系统消息（C）**：定义助手角色，告知模型处理图像描述任务
4. **上传图像并提问（D）**：在聊天窗格通过附件上传图像，并输入分析提示词

---

## 第 172 题

**背景**

你正在使用 Bot Framework SDK 构建一个聊天机器人，该机器人使用以下代码存储用户状态：

```csharp
var userStateAccessors = _userState.CreateProperty<UserProfile>(nameof(UserProfile));
var conversationStateAccessors = _conversationState.CreateProperty<ConversationData>(
    nameof(ConversationData));
```

状态存储机制设置为 **Memory Storage（内存存储）**。

**题目**

以下说法是否正确：

1. `CreateProperty()` 方法用于在状态对象中创建属性访问器
2. Memory Storage 中的用户状态在机器人重启后仍然保留
3. 需要调用 `SaveChangesAsync()` 才能将状态变更写回存储

**选项**

A. 1-是，2-是，3-是

B. 1-是，2-否，3-是

C. 1-是，2-是，3-否

D. 1-否，2-否，3-是

&nbsp;

---

**参考答案：B**

**解析：**

1. **正确**：`CreateProperty<T>()` 返回一个 `IStatePropertyAccessor<T>`，用于对状态中的特定属性进行 get/set 操作
2. **错误**：**Memory Storage 是内存中的临时存储**，机器人进程重启后，所有状态数据**丢失**。生产环境应使用 Azure Blob Storage 或 Cosmos DB 持久化存储
3. **正确**：在对话轮次（Turn）结束时，必须调用 `await _userState.SaveChangesAsync(turnContext)` 将状态变更写回，否则更改不会持久化

---

## 第 173 题

**背景**

你有一个 Azure AI Search 服务，在过去 12 个月里查询量持续增长，部分搜索查询请求开始被**限速（Throttled）**。

**题目**

以下三种方案，哪种可以有效减少被限速的可能性？

- 方案 A：迁移到更高定价层的 Cognitive Search 服务
- 方案 B：添加更多索引（Add more indexes）
- 方案 C：启用 CMK 加密

判断每种方案是否有效：

**选项**

A. 仅方案 A 有效

B. 方案 A 和 B 均有效

C. 三种方案均有效

D. 三种方案均无效

&nbsp;

---

**参考答案：A**

**解析：**

- **方案 A（有效）**：更高定价层提供更多副本（Replicas）支持，副本数增加可以提高并发查询处理能力，有效缓解查询限速
- **方案 B（无效）**：添加索引只增加了数据存储和索引复杂度，不提升查询吞吐量，对限速没有帮助
- **方案 C（无效）**：CMK 加密是数据安全功能，与性能无关，且实际上会**增加**索引大小和**降低**查询性能

---

## 第 174 题

**背景**

你正在构建一个使用 Azure AI Language 分析文章的应用，文章文本为：

> "Our tour guide took us up the Space Needle during our trip to Seattle last week."

应用调用 Language 服务并得到包含以下信息的响应：
- "Space Needle" → 地标（Landmark）
- "Seattle" → 地理位置（GeographicArea）
- "last week" → 时间表达（DateRange）

**题目**

使用了哪个 Language 服务 API？

**选项**

A. 实体链接（Entity Linking）

B. 命名实体识别（Named Entity Recognition，NER）

C. 关键短语提取（Key Phrase Extraction）

D. 情感分析（Sentiment Analysis）

&nbsp;

---

**参考答案：B**

**解析：**

**命名实体识别（NER）** 识别文本中具有语义类型的实体并分类，响应包含：
- `text`（实体文本）
- `category`（类别，如 Location、DateTime）
- `subcategory`（子类别，如 Landmark、GeographicArea）
- `confidenceScore`（置信度）

题目中的响应格式（地标分类、地理位置分类、日期范围分类）正是 NER 的典型输出。

实体链接（A）额外提供 Wikipedia URL；关键短语提取（C）只返回重要短语字符串，没有类别信息；情感分析（D）返回正/负/中性评分。

---

## 第 175 题

**背景**

你正在使用 Conversational Language Understanding（CLU）服务构建一个自然语言模型。在测试时，用户反馈模型在处理**与模型能力无关的问题**时给出了错误的响应。

**题目**

为了确保模型能正确识别并处理超出其能力范围的请求，应采取什么措施？

**选项**

A. 启用主动学习

B. 向自定义意图添加更多示例

C. 向 None 意图添加示例（标记为"无效/无关请求"）

D. 添加更多实体

&nbsp;

---

**参考答案：C**

**解析：**

**None 意图（None Intent）** 是 CLU/LUIS 中的特殊意图，用于捕获所有不属于任何自定义意图的用户输入。

向 None 意图添加足够多样的无关示例，可以让模型学会区分：
- 相关请求 → 匹配具体自定义意图
- 无关请求 → 匹配 None 意图（低置信度，触发回退逻辑）

这直接解决"对无关问题返回错误匹配"的问题。最佳实践是 None 意图的示例数量应与所有其他意图示例数量之和相当。

---

## 第 176 题

**背景**

你正在构建一个 Conversational Language Understanding 模型，需要支持以下用户语料：

- "Set all the lights to on." → 设置所有灯为开
- "Turn off the lights in the living room." → 关闭客厅的灯
- "What is the current thermostat temperature?" → 查询恒温器当前温度
- "Lower the temperature of the thermostat by five degrees." → 降低恒温器温度5度

**题目**

应向模型添加哪三个元素（每个正确答案都是解决方案的一部分）？

**选项**

A. location（位置）意图

B. change setting（更改设置）实体

C. device（设备类型）意图

D. change setting（更改设置）意图

E. query setting（查询设置）意图

F. device（设备类型）实体

&nbsp;

---

**参考答案：B、D、F**（注意：原题 176 答案为 B、C、F，存在分歧）

**解析：**

分析四个语料：
- 前两条："设置/关闭灯"→ **更改设置（change setting）** 类意图
- 后两条：一条是查询，一条是调整 → 可以合并为"设备控制"意图或拆分

模型元素设计：
- **`change setting` 实体（B）**：从语料中提取"设置值"（如 on/off、five degrees）的实体
- **`change setting` 意图（D）**：涵盖"设置/调整"类操作（前两条 + 第四条）
- **`device` 实体（F）**：提取语料中的设备对象（lights、thermostat）

> ⚠️ **争议说明**：原题答案为 B（change setting entity）、**C（device intent）**、F（device entity），这意味着"device 意图"覆盖设备操作，而非分为 change setting 和 query setting 两个意图。不同版本的解析有差异，请结合具体考试版本判断。

---

## 第 177 题

**背景**

你正在使用 Bot Framework SDK 构建一个机器人，并需要在**本地计算机上以交互方式测试**该机器人。

**题目**

应按顺序执行哪三项操作？

**选项**（选三项并排序）

A. 在本地启动机器人

B. 打开 Bot Framework Emulator

C. 在 Emulator 中连接到机器人的本地端点（如 http://localhost:3978/api/messages）

D. 将机器人部署到 Azure

E. 在 Azure 门户中注册机器人

&nbsp;

---

**参考答案：A → B → C**（顺序也可为 B → A → C）

**解析：**

在本地交互测试机器人的步骤：

1. **本地启动机器人（A）**：在命令行或 IDE 中运行机器人项目（如 `dotnet run` 或 `node index.js`），使其监听本地端口（默认 3978）
2. **打开 Bot Framework Emulator（B）**：启动 Emulator 桌面应用
3. **连接本地端点（C）**：在 Emulator 中点击"Open Bot"，输入本地端点 URL `http://localhost:3978/api/messages`，即可开始交互测试

不需要部署到 Azure（D）或注册（E）即可进行本地测试。

---

## 第 178 题

**背景**

你正在设计一个使用 Azure AI 服务的互联网远程学习解决方案。你的公司发现在培训过程中，一些学习者会长时间离开桌面或注意力不集中。

你需要使用学习者电脑的**视频和音频流**来检测学习者是否在场并集中注意力，且解决方案必须**最小化开发工作量**。

**题目**

针对以下两个需求，应分别使用哪个 Azure AI 服务？

- 检测学习者是否在屏幕前（presence detection）
- 识别每个学习者的身份（identity）

**选项**

A. 检测存在→Computer Vision；识别身份→Face API

B. 检测存在→Face API（人脸检测）；识别身份→Face API（人员识别）

C. 检测存在→Video Indexer；识别身份→Face API

D. 检测存在→Anomaly Detector；识别身份→Computer Vision

&nbsp;

---

**参考答案：B**

**解析：**

两个需求都可以由 **Azure Face API** 满足：

- **检测学习者是否在场**：Face API 的 `Detect` 接口可以实时检测视频帧中是否有人脸（有人脸 = 在场）
- **识别每个学习者身份**：Face API 的 `Identify` 接口，通过预先注册（Enrollment）每个学习者的面部特征，可以在检测到人脸时识别是哪位学习者

使用单一服务（Face API）完成两个任务，是最小化开发工作量的方案。

> ⚠️ **注意**：Azure Face API 的人员识别功能属于受限访问功能（Limited Access），需要向微软申请才能使用。

---

## 第 179 题

**背景**

你正在使用 Language Understanding（LUIS）服务构建一个为联系人列表搜索信息的语言模型，模型使用名为 `Find Contact` 的意图。

一位对话专家提供了以下培训短语：
- "Find contacts in London."
- "Who do I know in Seattle?"
- "Search for contacts in Ukraine."

你需要在 Language Understanding 中实现这些短语的功能。

以下三种方案，哪种能实现目标？

**题目**

- 方案 A：为"位置"创建一个新意图（New Intent for location）
- 方案 B：为"域"创建一个新实体（New Entity for domain）
- 方案 C：在 Find Contact 意图中创建一个新模式（New Pattern）

**选项**

A. 方案 A 满足目标

B. 方案 B 满足目标

C. 方案 C 满足目标

D. 三种方案均不满足

&nbsp;

---

**参考答案：A**

**解析：**

分析需求：用户要在联系人列表中按**地点**搜索联系人，"在 London 搜索"、"在 Seattle 认识谁"等，这些都是针对地点的联系人查找行为。

**方案 A（正确）**：为"位置搜索"创建一个新的独立意图，并将这三个地点相关的语料添加到该意图中，有助于模型区分通用的 Find Contact 和按地点查找联系人的不同场景

**方案 B（错误）**：创建实体而非意图；虽然"地点"应该是实体，但题目要求的是"实现这些短语"（即让模型能处理按地点的联系人搜索），需要意图层面的处理

**方案 C（错误）**：模式（Pattern）在已有意图中添加规律，但这里需要的是新意图来区分场景

---

## 第 180 题

**背景**

你正在使用 Microsoft Bot Framework Composer 构建一个聊天机器人，语言生成（Language Generation，LG）文件包含以下片段：

```
# Greet(user)
- ${Greeting()}, ${user.name}
```

**题目**

关于上述 LG 模板，以下说法是否正确？

1. 当 `user.name` 为空时，模板会抛出错误
2. `Greet(user)` 是一个发送响应（Send a response）操作
3. `${Greeting()}` 调用了另一个 LG 模板

**选项**

A. 1-是，2-是，3-是

B. 1-否，2-否，3-是

C. 1-否，2-是，3-否

D. 1-是，2-否，3-是

&nbsp;

---

**参考答案：B**

**解析：**

1. **错误**：`${user.name}` 在值为空时通常返回空字符串，LG 框架不会因此抛出错误（可以使用 `coalesce()` 函数处理空值情况）
2. **错误**：`# Greet(user)` 是一个 **LG 函数模板**（可被调用的模板），不是 Bot Composer 中的"发送响应（Send a response）"操作节点
3. **正确**：`${Greeting()}` 使用 `${}` 语法调用了另一个名为 `Greeting` 的 LG 模板，实现模板复用

---

*第 101–180 题整理完毕。*

---

## 第 181 题

**背景**

你有一个自定义 Azure Vision 项目，用于通用对象检测（General 领域），其中包含一个已训练的模型。你需要将该模型**导出用于断网环境（Disconnected Network）**。

**题目**

应按顺序执行哪三项操作？

**选项**（选三项并排序）

A. 将模型域从 General 更改为 General (compact)

B. 使用 compact 域重新训练模型

C. 将模型导出为 TensorFlow 或 ONNX 格式

D. 将模型部署到 Azure 容器实例

E. 在 Custom Vision 门户中发布模型

&nbsp;

---

**参考答案：A → B → C**

**解析：**

离线/导出部署的流程：

1. **切换到紧凑型域（A）**：标准 General 域的模型**不可导出**，必须先切换为 General (compact) 或 Object Detection (compact) 等紧凑型域
2. **重新训练（B）**：更换域后需要重新训练模型
3. **导出模型（C）**：导出为适合目标平台的格式，如 TensorFlow（Android）、CoreML（iOS）、ONNX（Windows ML）、Docker 容器等

---

## 第 182 题

**背景**

你有 500 个提示词-补全对（prompt-completion pairs），用于微调（Fine-tune）Azure OpenAI 模型。你需要准备训练数据文件。

**题目**

应使用什么文件格式存储训练数据？

**选项**

A. XML（.xml）

B. JSONL（.jsonl，每行一个 JSON 对象）

C. CSV（.csv）

D. TSV（.tsv）

&nbsp;

---

**参考答案：B**

**解析：**

Azure OpenAI 微调（Fine-tuning）要求训练数据以 **JSONL** 格式提供，每行包含一个完整的对话示例：

```jsonl
{"messages": [{"role": "system", "content": "You are..."}, {"role": "user", "content": "Q"}, {"role": "assistant", "content": "A"}]}
{"messages": [{"role": "system", "content": "You are..."}, {"role": "user", "content": "Q2"}, {"role": "assistant", "content": "A2"}]}
```

这种格式既支持结构化数据（每行独立 JSON），又便于流式处理大型文件。

---

## 第 183 题

**背景**

你有一个 Azure AI Content Safety 资源，需要对用户上传的图像进行内容安全检测。你提交了一张测试图像（仅包含一个几何圆圈），并设置了检测类别为 `["Hate", "SelfHarm", "Sexual", "Violence"]`。

**题目**

对于这张测试图像，以下哪项说法正确？

**选项**

A. API 将返回四个类别各自的严重性得分（0-7 整数）

B. API 将返回单一的总体安全评分（0-100）

C. 如果所有类别得分为 0，API 会返回错误（因为没有检测到任何内容）

D. API 的 `categories` 参数只能指定一个类别

&nbsp;

---

**参考答案：A**

**解析：**

Azure AI Content Safety 图像分析 API 的响应结构为：

```json
{
  "categoriesAnalysis": [
    {"category": "Hate", "severity": 0},
    {"category": "SelfHarm", "severity": 0},
    {"category": "Sexual", "severity": 0},
    {"category": "Violence", "severity": 0}
  ]
}
```

- 每个请求中可以指定**多个**检测类别
- 每个类别返回独立的严重性得分（整数，0-7）
- 所有得分为 0 是完全正常的响应（表示没有检测到任何有害内容），不会返回错误

---

## 第 184 题

**背景**

你正在构建一个多语言电商聊天机器人，针对不同语言的用户有不同的回复内容。你需要实现两个核心功能：检测消息语言 + 分析消息情感。

**题目**

应在解决方案中使用哪两个 Azure AI Language 功能？

**选项**

A. 实体链接（Entity Linking）+ 情感分析（Sentiment Analysis）

B. 情感分析（Sentiment Analysis）+ 语言检测（Language Detection）

C. 关键短语提取（Key Phrase Extraction）+ 语言检测

D. 命名实体识别（NER）+ 情感分析

&nbsp;

---

**参考答案：B**

**解析：**

- **情感分析（Sentiment Analysis）**：检测用户消息是正面、负面还是中性，用于区分不同情感并给出相应回复
- **语言检测（Language Detection）**：识别用户使用的语言，多语言机器人需要先知道语言才能选择对应的回复模板或翻译策略

这两个功能配合使用，可以实现"检测语言 → 选择对应语言模型 → 分析情感 → 给出合适回复"的完整流程。

---

## 第 185 题

**背景**

你有一个 Azure OpenAI 资源（AI1），需要为一个应用（User1）提供能够**执行以下操作**的最小权限访问：

- 在 Azure OpenAI Studio 中识别资源端点
- 查看可部署的模型列表
- 通过已部署模型生成文本和图像

**题目**

应为 User1 分配哪个角色？（遵循最小权限原则）

**选项**

A. Cognitive Services OpenAI User

B. Cognitive Services Contributor

C. Contributor

D. Cognitive Services OpenAI Contributor

&nbsp;

---

**参考答案：A**

**解析：**

**Cognitive Services OpenAI User** 角色权限包括：
- 查看端点和凭据 ✅
- 浏览可用模型列表 ✅
- 通过 API 或 Studio 使用已部署模型生成内容 ✅

此角色**不包括**：创建部署、上传数据、微调模型等管理操作。

题目要求的三项操作均在 OpenAI User 权限范围内，且不需要更高级别的 Contributor 或管理权限，符合最小权限原则。

---

## 第 186 题

**背景**

你正在构建一个 Azure AI 解决方案，使用情感分析（Sentiment Analysis）结果来计算客服人员的绩效奖金。你需要确保该解决方案符合 Microsoft 负责任 AI（Responsible AI）原则。

**题目**

应该采取什么措施来满足负责任 AI 原则？

**选项**

A. 在做出影响员工经济状况的决策之前，添加人工审核和审批步骤

B. 在调查返回低置信度分数时也包含情感分析结果

C. 使用所有调查数据，包括已要求删除账户和数据的客户的调查

D. 将原始调查数据发布到集中位置，让员工自行访问

&nbsp;

---

**参考答案：A**

**解析：**

微软负责任 AI 原则中的**问责制（Accountability）** 和 **公平性（Fairness）** 要求：

- 对于影响人类的重大决策（如经济奖惩），不应完全依赖 AI 自动判断
- 必须有**人工监督（Human-in-the-loop）**：在 AI 给出建议后，由有权限的人员进行审核并做出最终决定

选项 A 正确体现了这一原则：在情感分析结果影响奖金决策之前，加入人工审核和审批环节。

选项 C 违反隐私原则（已删除账户的数据不应继续使用）；选项 B 可能导致低质量数据影响结果。

---

## 第 187 题

**背景**

你构建了一个 Language Understanding（LUIS）Docker 容器解决方案。

你从 Microsoft Container Registry（MCR）下载了 Language Understanding 容器镜像。

你需要**将容器镜像部署到主机计算机**。

**题目**

应按顺序执行哪三项操作？

**选项**（选三项并排序）

A. 在主机上安装 Docker Engine

B. 使用 `docker run` 命令运行容器，包含 Billing 端点和 API 密钥参数

C. 配置磁盘日志记录

D. 使用 `docker pull` 从 MCR 拉取容器镜像

E. 在 Azure 门户中为 LUIS 资源生成新密钥

&nbsp;

---

**参考答案：D → B → C**（假设 Docker 已安装）

**解析：**

部署 LUIS 容器的步骤：

1. **拉取容器镜像（D）**：`docker pull mcr.microsoft.com/azure-cognitive-services/luis:latest`
2. **运行容器（B）**：使用 `docker run` 命令，必须包含计费端点（`Billing`）和 API 密钥（`ApiKey`）参数，否则容器无法启动
3. **配置日志（C）**：（可选但推荐）配置日志输出以便监控容器运行状态

---

## 第 188 题

**背景**

你正在使用 Bot Framework SDK 构建一个聊天机器人，机器人需要使用 `ConversationData` 对象存储当前对话信息，使用 `UserProfile` 对象存储用户信息。

`UserProfile` 存储在用户作用域（User Scope），`ConversationData` 存储在对话作用域（Conversation Scope）。

**题目**

以下关于 Bot Framework 状态管理作用域的说法，哪项正确？

**选项**

A. 用户作用域（User Scope）中的属性在单次对话结束后自动清除

B. 对话作用域（Conversation Scope）中的属性在整个对话生命周期内持久存在，不会因新一轮交互而重置

C. 轮次作用域（Turn Scope）中的属性在当前轮次结束后过期

D. 对话作用域中的属性跟随用户账户，永久保留

&nbsp;

---

**参考答案：C**

**解析：**

Bot Framework SDK 的三种状态作用域：

| 作用域 | 生命周期 |
|-------|---------|
| **Turn Scope（轮次）** | 仅在当前轮次（单次请求-响应）内有效，轮次结束后自动过期 ✅ |
| Conversation Scope（对话） | 在整个对话会话内有效，对话结束（如用户关闭聊天窗口）后过期 |
| User Scope（用户） | 与用户绑定，不会过期（跨多次对话持久保留） |

选项 C 正确描述了轮次作用域的行为。

- 选项 A 错误：用户作用域不会在对话结束后清除
- 选项 D 错误：对话作用域跟随对话，不跟随用户账户

---

## 第 189 题

**背景**

你构建了一个机器人，使用 QnA Maker 应用。你需要从 Azure 门户获取连接到该 QnA Maker 应用所需的信息。

**题目**

应在 Azure 门户中的哪个刀片（Blade）找到所需连接信息？

**选项**

A. Access control (IAM)（访问控制）

B. Properties（属性）

C. Keys and Endpoint（密钥和终结点）

D. Identity（标识）

&nbsp;

---

**参考答案：C**

**解析：**

**"Keys and Endpoint"（密钥和终结点）** 刀片包含：
- 端点 URL（Endpoint URL）
- 订阅密钥（Subscription Key 1 和 Key 2）
- 知识库 ID（Knowledge Base ID）等连接所需的全部信息

这是所有 Azure AI 服务连接信息的标准存储位置，机器人连接 QnA Maker 应用时需要这些凭据。

---

## 第 190 题

**背景**

你有一个 Azure AI 认知搜索服务，并且有一个存储在 Azure Blob Storage 中的大型扫描文档集合（图像和 PDF 格式）。

你需要让这些文档**尽快可被搜索**。

**题目**

应采用哪种策略来最大化索引速度？

**选项**

A. 将数据拆分到多个 Blob 容器，为每个容器创建独立的认知搜索服务

B. 将数据拆分到多个 Blob 容器，为每个容器创建独立的索引器，增加搜索单元，配置**顺序**执行

C. 为每种文档类型（图像 vs PDF）创建一个独立的认知搜索服务

D. 将数据拆分到多个虚拟文件夹，为每个文件夹创建一个索引器，增加搜索单元，配置**并行**执行

&nbsp;

---

**参考答案：D**

**解析：**

加速大规模索引的最佳实践：

1. **拆分数据**：将数据分布到多个虚拟文件夹（或容器），每个文件夹对应一个数据源
2. **多个索引器**：为每个数据源创建独立的索引器，所有索引器都指向同一个搜索索引
3. **增加搜索单元**：每个搜索单元（SU）可以同时运行一个索引器，多个 SU 实现真正的并行处理
4. **并行执行**：配置所有索引器并行运行（而非顺序）

选项 B 错误在于使用了顺序执行（sequential），无法充分利用多个索引器的并行优势。

---

## 第 201 题

**背景**

你正在构建一个应用，使用 Azure AI Language 服务对新闻文章进行分析。文章内容为：

> "Microsoft announced a new partnership with OpenAI to advance AI research."

你调用了**实体链接（Entity Linking）** API。

**题目**

以下说法哪项正确？

**选项**

A. API 将返回 "Microsoft" 和 "OpenAI" 的 Wikipedia 链接，以及它们在文章中的位置

B. API 将返回 "partnership" 和 "research" 作为关键短语

C. API 将返回文章的整体情感分数（正面/负面）

D. API 将返回 "Microsoft" 和 "OpenAI" 的实体类别（如 Organization），但不提供外部链接

&nbsp;

---

**参考答案：A**

**解析：**

**实体链接（Entity Linking）** API 的核心功能：

1. 识别文本中可链接到知识库的实体（如 Wikipedia 中的已知实体）
2. 为每个实体返回：
   - `name`（规范化名称）
   - `url`（Wikipedia 链接）✅
   - `bingId`（Bing 知识图谱 ID）
   - `matches`（实体在文中的位置和置信度）✅

"Microsoft" 和 "OpenAI" 都是 Wikipedia 中有词条的知名实体，实体链接 API 会同时返回链接和位置信息。

关键短语提取（B）和情感分析（C）是独立的 API；命名实体识别（D）只分类不提供链接。

---

## 第 202 题

**背景**

你正在为公司开发一个使用 Azure AI Vision 服务的产品图像管理系统。系统需要为每张产品图像生成 **Alt Text（替代文本）**，以满足无障碍访问要求，且**最小化开发工作量**。

**题目**

应调用 Computer Vision API 的哪个功能？

**选项**

A. `tagImage`（图像标签）

B. `generateThumbnail`（缩略图生成）

C. `describeImage`（图像描述）

D. `detectObjects`（对象检测）

&nbsp;

---

**参考答案：C**

**解析：**

**`describeImage`**（或新版 Azure AI Vision 4.x 中的 `analyze` 接口 + `caption` 特性）生成图像的**自然语言完整句子描述**（如 "A red bicycle leaning against a brick wall"），这正是 Alt Text 所需的格式。

- `tagImage`（A）返回关键词列表（如 "bicycle, outdoor, red"），不是完整句子，不适合 Alt Text
- `generateThumbnail`（B）生成缩略图，不生成文字
- `detectObjects`（D）返回对象位置坐标，不生成描述文字

---

## 第 203 题

**背景**

你正在构建一个 Azure AI Search 解决方案，需要为博客文章集合创建索引。每篇文章有一个 `MessageCopy` 字段，包含用户在社交媒体上发送的消息文本。

要求：
- 用户能对 `MessageCopy` 字段进行全文搜索
- 搜索结果中能显示 `MessageCopy` 字段的值

**题目**

应为 `MessageCopy` 字段启用哪两个属性？

**选项**

A. Searchable（可搜索）和 Retrievable（可检索）

B. Sortable（可排序）和 Retrievable（可检索）

C. Searchable（可搜索）和 Facetable（可分面）

D. Filterable（可筛选）和 Retrievable（可检索）

&nbsp;

---

**参考答案：A**

**解析：**

两个需求对应的属性：

| 需求 | 所需属性 |
|------|---------|
| 用户可对字段内容进行关键词搜索 | **Searchable** |
| 搜索结果中显示该字段的值 | **Retrievable** |

- Sortable：允许按此字段排序，非题目需求
- Facetable：支持分面导航（下钻过滤），非题目需求
- Filterable：允许在 `$filter` 表达式中使用，非题目需求

---

## 第 204 题

**背景**

你正在使用 Azure AI 语言服务中的**问题解答（Question Answering）** 功能构建一个聊天机器人，知识库基于产品目录 PDF 训练。

测试时发现：机器人能正确回答 "What is the price of Product X?"，但无法回答 "How much does Product X cost?"。

**题目**

应采取哪项操作来解决该问题？

**选项**

A. 从 Language Studio，创建一个名为 `price` 的实体，然后重新训练并重新发布

B. 从 Language Studio，为该问答对添加 "How much does Product X cost?" 作为替代问法（Alternate question），然后重新训练并重新发布

C. 从 Language Studio，创建一个名为 `cost` 的实体，然后重新训练并重新发布

D. 将知识库导出，手动编辑 TSV 文件，添加新问答对

&nbsp;

---

**参考答案：B**

**解析：**

自定义问题解答服务通过**替代问法（Alternate Questions）** 解决语义等价但措辞不同的问题：

1. 在 Language Studio 中打开对应问答对
2. 在"Alternate questions"区域添加 "How much does Product X cost?"
3. 保存 → 训练 → 发布

此后，两种问法都能匹配到同一个答案，无需创建实体（实体是 CLU 的概念，不适用于问题解答服务）。

---

## 第 205 题

**背景**

你有一个 Azure AI Language 资源，执行以下操作：
- 情感分析
- 命名实体识别（NER）
- 个人可识别信息（PII）识别

你需要**防止该资源在分析完成后持久化存储输入数据**。

**题目**

应在 Language 服务 API 中配置哪个查询参数？

**选项**

A. `loggingOptOut=true`

B. `piiCategories=none`

C. `showStats=false`

D. `model-version=latest`

&nbsp;

---

**参考答案：A**

**解析：**

`loggingOptOut=true` 告知 Azure AI Language 服务**不记录和存储请求数据**，防止输入内容被持久化到微软的遥测系统中。

这对于处理敏感的 PII 数据尤为重要，是 GDPR 和数据隐私合规的关键设置。

在 REST API 请求中以查询参数形式附加：
```
POST {endpoint}/language/:analyze-text?api-version=2023-04-01&loggingOptOut=true
```

---

## 第 206 题

**背景**

你使用 Microsoft Bot Framework SDK 构建了一个机器人，并使用 Azure Bot Service 部署到 Azure。

你通过 **Bot Channels Registration** 服务注册了该机器人。

**题目**

完成部署时需要哪两个值？

**选项**

A. botId 和 tenantId

B. tenantId 和 appId

C. appId 和 appSecret

D. objectId 和 appSecret

&nbsp;

---

**参考答案：C**

**解析：**

部署 Azure Bot 时，需要 Azure Active Directory 应用注册的两个核心凭据：

- **appId（Application ID / Client ID）**：Azure AD 应用的唯一标识符，用于身份验证
- **appSecret（Client Secret）**：应用的密钥，与 appId 配合用于 OAuth 认证

这两个值在 Bot Channels Registration 的 Settings → Configuration 中配置，是机器人与 Azure Bot Service 通信的必要凭据。

---

## 第 207 题

**背景**

你正在使用 Azure OpenAI 服务构建一个聊天机器人，需要确保机器人的响应**更具确定性、更少创造性**（更适合精确问答场景）。

**题目**

应配置哪两个参数来实现这一目标？

**选项**

A. 降低 Temperature（如设为 0）和降低 Top P（如设为 0.1）

B. 提高 Temperature（如设为 2）和提高 Top P（如设为 1）

C. 降低 Temperature 和增加 Max tokens

D. 提高 Frequency penalty 和降低 Presence penalty

&nbsp;

---

**参考答案：A**

**解析：**

两个控制输出随机性的核心参数：

- **Temperature（温度）**：接近 0 时，模型几乎总是选择最高概率的词汇（确定性），接近 2 时输出最随机
- **Top P（核采样）**：接近 0 时，模型只从极少数高概率词汇中选择（更保守），接近 1 时考虑更多词汇

同时降低两者，使输出尽可能确定性、不创新，适合精确问答。

> ⚠️ **注意**：在实践中，Temperature 和 Top P 通常只调整其中一个；同时调整可能产生意外效果。微软建议优先调整 Temperature，保持 Top P 默认值（1）。

---

## 第 208 题

**背景**

你正在构建一个使用 Azure AI 视觉（Computer Vision）分析图像的应用，需要判断图像是否包含**成人或不雅内容（Adult content）**，以进行内容审核。

**题目**

调用 Analyze Image API 时，应将 `visualFeatures` 参数设置为什么？

**选项**

A. `visualFeatures=ImageType`

B. `visualFeatures=Adult`

C. `visualFeatures=Categories`

D. `visualFeatures=Tags`

&nbsp;

---

**参考答案：B**

**解析：**

`Adult` 是 Computer Vision Analyze Image API 的一个 `visualFeatures` 选项，返回：

```json
"adult": {
    "isAdultContent": false,
    "isRacyContent": false,
    "isGoryContent": false,
    "adultScore": 0.003,
    "racyScore": 0.002,
    "goreScore": 0.001
}
```

通过检查 `isAdultContent` 布尔值和 `adultScore` 置信度分数，可以判断图像是否包含成人内容。

> **注意**：对于更细粒度的内容安全检测（包括暴力、仇恨等类别），推荐使用 **Azure AI Content Safety** 服务。

---

## 第 209 题

**背景**

你正在规划一个 Azure AI 解决方案，需要对公司内部文档（包括 PDF 和 Word 文件）进行全文搜索。这些文档包含扫描图像中的文字。

**题目**

应在 Azure AI Search 的富化管道（Enrichment Pipeline）中包含哪个技能，以使扫描图像中的文字可被搜索？

**选项**

A. 关键短语提取技能（Key Phrase Extraction Skill）

B. 实体识别技能（Entity Recognition Skill）

C. OCR 技能（Optical Character Recognition Skill）

D. 文档提取技能（Document Extraction Skill）

&nbsp;

---

**参考答案：C**

**解析：**

**OCR 技能** 使用 Azure AI Vision 的 Read API 从图像中提取文字内容：

```json
{
  "@odata.type": "#Microsoft.Skills.Vision.OcrSkill",
  "defaultLanguageCode": "en",
  "inputs": [
    {"name": "image", "source": "/document/normalized_images/*"}
  ],
  "outputs": [
    {"name": "text", "targetName": "rawText"},
    {"name": "layoutText", "targetName": "layoutText"}
  ]
}
```

提取的文字随后可以映射到搜索索引的 Searchable 字段，实现对扫描文档内容的全文搜索。

---

## 第 210 题

**背景**

你有一家工厂，使用 Azure Custom Vision 构建了一个用于**识别纸板包装缺陷**并定位缺陷位置的模型。工厂有**间歇性互联网连接**，且要求确保每个包装中包含四个产品样本。

**题目**

应使用哪种 Custom Vision 项目类型和域（Domain）？

**选项**

A. 项目类型：图像分类（Image Classification）；域：General

B. 项目类型：对象检测（Object Detection）；域：General (compact)

C. 项目类型：图像分类；域：Retail

D. 项目类型：对象检测；域：General

&nbsp;

---

**参考答案：B**

**解析：**

两个关键点分析：

1. **项目类型**：需要"识别缺陷**并定位缺陷位置**"，说明需要知道缺陷在图像中的位置（bounding box），这是**对象检测（Object Detection）** 的特征；图像分类只给出整体标签，不提供位置
2. **域**：工厂有**间歇性互联网连接**，模型需要能离线运行，必须使用 **compact 域**（可导出为 TensorFlow/ONNX 等格式在本地运行）

因此选择"对象检测 + General (compact)"。

---

## 第 211 题

**背景**

你正在使用 Azure AI 语言服务和 Bot Framework SDK 构建一个聊天机器人，机器人需要**引导用户完成一个产品设置的分步流程**。

**题目**

应使用哪种对话（Dialog）类型来实现分步引导？

**选项**

A. 组件对话（Component Dialog）

B. 瀑布对话（Waterfall Dialog）

C. 自适应对话（Adaptive Dialog）

D. 技能对话（Skill Dialog）

&nbsp;

---

**参考答案：B**

**解析：**

**瀑布对话（Waterfall Dialog）** 定义了一系列有序的步骤，每个步骤完成后自动进入下一步，非常适合固定的分步引导流程（如产品设置向导）：

```csharp
new WaterfallDialog("productSetup", new WaterfallStep[]
{
    ChooseProductTypeAsync,  // 步骤1
    ConfigureOptionsAsync,   // 步骤2
    ConfirmSetupAsync,       // 步骤3
    FinishSetupAsync         // 步骤4
})
```

组件对话（A）用于封装可复用逻辑模块；自适应对话（C）适合复杂事件驱动场景；技能对话（D）用于调用远程部署的技能服务。

---

## 第 212 题

**背景**

你正在构建一个应用，需要对视频内容进行情感分析。视频来自公司 1,000 个产品评测 YouTube 视频。

你需要使用 Azure AI Content Understanding 项目，且解决方案必须**最小化开发工作量**。

**题目**

应使用哪种项目模板？

**选项**

A. 视频镜头分析（Video shot analysis）

B. 媒体资产管理（Media asset management）

C. 广告分析（Advertising）

&nbsp;

---

**参考答案：B**

**解析：**

**媒体资产管理（Media asset management）** 模板提供对视频内容的综合分析能力，包括情感检测、关键词提取、语音转文字等功能，是进行视频情感分析的最全面且开发工作量最小的模板选择。

视频镜头分析（A）专注于视频场景切换和镜头分类；广告分析（C）针对广告特定内容（品牌、产品出现频率等）。

---

## 第 213 题

**背景**

你正在使用 Azure AI Search 构建一个富化管道，并创建了一个知识存储（Knowledge Store）。

知识存储包含**非结构化 JSON 数据**（来自社交媒体帖子的富化结果）。

**题目**

对于非结构化 JSON 数据，应在知识存储定义中使用哪种投影类型？

**选项**

A. 表投影（Table projection）

B. 对象投影（Object projection）

C. 文件投影（File projection）

D. 行投影（Row projection）

&nbsp;

---

**参考答案：B**

**解析：**

知识存储三种投影类型的适用场景：

| 投影类型 | 存储格式 | 适用场景 |
|---------|---------|---------|
| **Object（对象）** | Blob Storage 中的 JSON 文件 | 非结构化/半结构化 JSON 数据 ✅ |
| Table（表格） | Azure Table Storage | 结构化、关系型数据 |
| File（文件） | Blob Storage 中的二进制文件 | 图像、PDF 等文件 |

社交媒体帖子的富化结果（含情感分数、实体、关键词等）以 JSON 格式存储，最适合**对象投影**。

---

## 第 214 题

**背景**

你正在为一个 Azure AI 解决方案配置访问控制。解决方案使用 Azure AI 认知服务资源（CSAccount1），连接到一个名为 vnet1 的虚拟网络。

你需要确保**只有 vnet1 中的特定资源才能访问 CSAccount1**，且解决方案必须**最小化管理工作量**。

**题目**

应执行哪两项操作？

**选项**

A. 在 vnet1 中为 CSAccount1 启用服务端点（Service Endpoint）

B. 在 vnet1 中创建一个虚拟子网

C. 在 CSAccount1 中配置访问控制（IAM）设置

D. 在 vnet1 中修改虚拟网络设置

E. 在 CSAccount1 中修改虚拟网络设置

&nbsp;

---

**参考答案：A、B**（注：原题 274 答案）

**解析：**

限制特定 VNet 访问 Azure AI 服务资源的步骤：

1. **在 vnet1 中为 CSAccount1 启用服务端点（A）**：为 vnet1 的子网启用 `Microsoft.CognitiveServices` 服务端点，使流量通过微软骨干网直达服务，而非公共互联网
2. **创建虚拟子网（B）**：如果 vnet1 中还没有适当的子网，需要先创建子网，然后在子网上启用服务端点

完成后，在 CSAccount1 的"网络"设置中添加 vnet1 的子网到允许列表，即可实现访问限制。

---

## 第 215 题

**背景**

你正在使用 Azure AI Content Safety 构建一个检测有害内容的解决方案。你需要在一次 API 调用中同时检测文本中的**仇恨（Hate）**、**暴力（Violence）** 和**色情（Sexual）** 内容。

**题目**

在 `AnalyzeText` 请求中，`categories` 参数应如何设置？

**选项**

A. `"categories": "Hate,Violence,Sexual"`（逗号分隔字符串）

B. `"categories": ["Hate", "Violence", "Sexual"]`（JSON 数组）

C. 发送三次独立的 API 调用，每次检测一个类别

D. `"category": "All"`（检测所有类别）

&nbsp;

---

**参考答案：B**

**解析：**

Azure AI Content Safety `AnalyzeText` API 使用 **JSON 数组格式**指定要检测的内容类别：

```json
{
  "text": "user input",
  "categories": ["Hate", "Violence", "Sexual"],
  "outputType": "FourSeverityLevels"
}
```

单次 API 调用即可同时检测多个类别，响应中包含每个类别的独立严重性评分，无需发送多次请求。

---

## 第 216 题

**背景**

你正在构建一个 Azure AI Foundry 中的代理（Agent），需要该代理能够：

- 理解用户的书面问题
- 生成答案
- **以语音形式输出答案**

**题目**

为了创建能满足上述所有要求的代理项目，应使用哪个工具？

**选项**

A. Language Studio

B. Azure AI Foundry

C. Speech Studio

D. Azure 门户

&nbsp;

---

**参考答案：B**

**解析：**

**Azure AI Foundry** 是微软统一的 AI 开发平台，提供：
- 创建和管理 AI 代理（Agent）的完整工作流
- 集成 Azure OpenAI（生成文本答案）
- 集成 Azure AI Speech（将文本转为语音输出）
- 连接自定义数据源和工具

所有这些能力可以在 Azure AI Foundry 的统一界面中配置，是构建多模态代理的最佳入口。

Language Studio（A）专注于 NLP 功能配置；Speech Studio（C）专注于语音模型定制；Azure 门户（D）用于资源管理，不是代理开发环境。

---

## 第 217 题

**背景**

你正在开发一个 C# 应用，使用 Azure AI Document Intelligence 分析**手写内容** PDF 文件。

```csharp
var client = new DocumentAnalysisClient(
    new Uri(endpoint),
    new AzureKeyCredential(key));

AnalyzeDocumentOperation operation = await client.AnalyzeDocumentAsync(
    WaitUntil.Completed,
    "prebuilt-read",     // 模型 ID
    fileStream
);

AnalyzeResult result = operation.Value;
```

**题目**

以下说法哪项正确？

**选项**

A. `prebuilt-read` 模型只能识别打印文字，无法识别手写内容

B. `prebuilt-read` 模型支持手写内容识别，适合此场景

C. 应将模型 ID 改为 `prebuilt-document` 才能识别手写内容

D. 应将模型 ID 改为 `prebuilt-layout` 才能识别手写内容

&nbsp;

---

**参考答案：B**

**解析：**

**`prebuilt-read`** 模型是 Azure AI Document Intelligence 中专门用于文本提取的模型，它：
- 支持**打印文字**和**手写文字** ✅
- 支持 PDF、图像（JPEG、PNG、TIFF 等）格式
- 支持多种语言
- 返回文字内容、行、单词及其位置信息

`prebuilt-document` 额外提取键值对和表格，但对手写识别的支持与 `prebuilt-read` 相同；`prebuilt-layout` 专注于文档结构分析。

---

## 第 218 题

**背景**

你需要构建一个 Azure AI Search 解决方案，用于搜索一个包含大量 wiki 内容的数据库。wiki 内容以英语、法语和葡萄牙语书写，存储在 Azure Cosmos DB 中。

技术要求：所有项目都必须支持英语、法语和葡萄牙语。

**题目**

应在解决方案中包含什么？

**选项**

A. 附加到技能集的 Azure Blob Storage 索引器，技能集包含语言检测技能和文本翻译技能

B. 附加到技能集的 Azure Blob Storage 索引器，技能集包含语言检测技能

C. 附加到技能集的 Azure Cosmos DB 索引器，技能集包含文档提取技能和文本翻译技能

D. 附加到技能集的 Azure Cosmos DB 索引器，技能集包含语言检测技能和文本翻译技能

&nbsp;

---

**参考答案：C**

**解析：**

分析两个关键点：

1. **数据源**：内容存储在 **Azure Cosmos DB**，应使用 **Cosmos DB 索引器**（而非 Blob Storage 索引器）
2. **技能需求**：
   - **文档提取技能（Document Extraction Skill）**：从 Cosmos DB 文档中提取文本内容
   - **文本翻译技能（Text Translation Skill）**：将内容翻译为所需语言

不需要语言检测技能，因为 Translator API 可以自动检测源语言，无需预先检测。

---

## 第 219 题

**背景**

你有一个包含数千张图像的图库，需要为每张图像生成**标签列表**，且标签必须支持多种语言（英语、法语、西班牙语），且**最小化开发工作量**。

**题目**

应使用哪个 Azure 服务端点？

**选项**

A. Custom Vision 图像分类

B. Content Moderator 图像审核

C. Custom Translator

D. Computer Vision 图像分析（Image Analysis）

&nbsp;

---

**参考答案：D**

**解析：**

**Computer Vision Image Analysis API** 的 `Tags` 功能可以：
- 为图像生成描述性标签列表
- 通过 `language` 参数支持多种输出语言（英语、法语、西班牙语等）

```
POST https://{endpoint}/vision/v3.2/analyze?visualFeatures=Tags&language=fr
```

无需自定义训练，直接调用 API 即可获得多语言标签，开发工作量最小。

Custom Vision（A）需要训练数据；Content Moderator（B）用于内容安全；Custom Translator（C）用于文本翻译，不生成图像标签。

---

## 第 220 题

**背景**

你有一个使用 Azure Anomaly Detector 服务的监控解决方案。你配置了一台名为 Server1 的服务器，具有间歇性互联网访问。

你需要**在 Server1 上部署 Azure AI 异常检测器服务**。

**题目**

应按顺序执行哪四项操作？

**选项**（选四项并排序）

A. 从 Microsoft Container Registry 拉取 Anomaly Detector 容器镜像

B. 创建 Azure Anomaly Detector 资源（用于获取计费密钥）

C. 使用 `docker run` 命令运行容器，包含 Billing 端点和 ApiKey 参数

D. 在 Server1 上安装 Docker Engine

E. 将 Server1 加入 Azure 虚拟网络

&nbsp;

---

**参考答案：B → D → A → C**

**解析：**

在服务器上部署 Azure AI 容器的完整流程：

1. **创建 Azure 资源（B）**：在 Azure 门户创建 Anomaly Detector 资源，获取端点 URL 和 API 密钥（容器运行时需要向 Azure 汇报计费信息）
2. **安装 Docker（D）**：在 Server1 上安装 Docker Engine（先决条件）
3. **拉取容器镜像（A）**：`docker pull mcr.microsoft.com/azure-cognitive-services/decision/anomaly-detector:latest`
4. **运行容器（C）**：`docker run` 命令中必须包含 `Billing={ENDPOINT}` 和 `ApiKey={KEY}` 参数

---

## 第 221 题

**背景**

你有 5 个使用 Bot Framework Composer 创建的聊天机器人，需要构建一个**单一机器人**将这 5 个机器人组合起来，并能根据用户输入**动态路由**到正确的子机器人。

**题目**

应执行哪三项操作？

**选项**（选三项）

A. 创建 Orchestrator 模型（Create an Orchestrator model）

B. 更改 Recognizer/Dispatch 类型

C. 创建 Composer 扩展

D. 启用 WebSockets

E. 创建自定义 Recognizer JSON 文件

F. 安装 Orchestrator 包（Install the Orchestrator package）

&nbsp;

---

**参考答案：A、B、F**

**解析：**

使用 Orchestrator 实现多机器人路由：

1. **安装 Orchestrator 包（F）**：`npm install @microsoft/bf-orchestrator-cli` 安装必要的 CLI 工具
2. **创建 Orchestrator 模型（A）**：使用 Orchestrator CLI 基于各子机器人的意图训练路由模型
3. **更改 Recognizer 类型（B）**：在主机器人的 Bot Composer 中，将 Recognizer 类型从 LUIS 更改为 Orchestrator，使其使用训练好的路由模型

Orchestrator 是微软专为多机器人路由设计的轻量级 NLU 引擎，通过语义相似度实现动态路由。

---

## 第 222 题

**背景**

你正在使用 Speech SDK 构建一个应用，需要将**法语语音**翻译成**德语**，通过自然语言处理实现。

**题目**

在 `SpeechTranslationConfig` 中，应如何设置源语言和目标语言？

**选项**

A. `SpeechRecognitionLanguage = "fr"`；`AddTargetLanguage("de-DE")`

B. `SpeechRecognitionLanguage = "fr-FR"`；`AddTargetLanguage("de")`

C. `SourceLanguage = "French"`；`TargetLanguage = "German"`

D. `SpeechRecognitionLanguage = "de-DE"`；`AddTargetLanguage("fr-FR")`

&nbsp;

---

**参考答案：B**

**解析：**

Speech Translation SDK 的语言设置规范：

- **`SpeechRecognitionLanguage`（源语言）**：使用**区域代码格式**（BCP-47），如 `"fr-FR"`（法语-法国）
- **`AddTargetLanguage()`（目标语言）**：使用 **ISO 639-1 两字母代码**，如 `"de"`（德语）

这两个参数使用不同的格式是 Speech Translation API 的特有规范，需要特别注意。

---

## 第 223 题

**背景**

你正在构建一个为用户提供 AI 功能的应用，需要同时使用 **Speech API** 和 **Language API**。

要求通过**单一端点和凭据**访问所有服务。

**题目**

应创建哪种类型的资源？

**选项**

A. Azure AI Language 资源

B. Azure AI Foundry service（Azure AI 服务多服务资源）

C. Azure AI Speech 资源

D. Azure AI Content Safety 资源

&nbsp;

---

**参考答案：B**

**解析：**

**Azure AI Foundry service**（即 Azure AI Services 多服务资源，也称全功能资源）提供：
- 通过**单一密钥和端点**访问多种 Azure AI 服务
- 涵盖 Speech、Language、Vision、Decision 等多个类别
- 统一计费

单独的 Language 资源（A）或 Speech 资源（C）只能访问各自对应的服务，无法实现单一端点访问两个服务。

---

## 第 224 题

**背景**

你正在为一个互联网培训解决方案设计系统，需要监控学员的视频流，检测**学员何时向讲师提问**（通过检测语音内容）。

解决方案必须**最小化开发工作量**。

**题目**

应在解决方案中包含什么？

**选项**

A. Azure AI Custom Vision 的对象检测

B. Azure AI Vision 的 Face 服务

C. Azure AI Language 服务的语言检测

D. Azure AI Speech 服务的语音转文字

&nbsp;

---

**参考答案：D**

**解析：**

检测"学员向讲师提问"需要分析**语音内容**（而非视频图像），具体流程：

1. **语音转文字（D）**：实时将学员的语音转换为文本
2. 基于文本内容（如检测到疑问句结尾、问号等特征）判断是否在提问

**Azure AI Speech 的语音转文字**服务提供实时流式识别，是最直接的实现方式，无需处理视频帧，开发工作量最小。

对象检测（A）、Face 服务（B）分析的是视觉内容，无法检测语音提问；语言检测（C）识别文本语言，不转录语音。

---

## 第 225 题

**背景**

你有一个 Azure OpenAI 资源，部署了 GPT-3.5 Turbo 模型。你使用以下系统消息配置模型：

> "You are an AI assistant that helps people solve mathematical puzzles. Explain your answers as if the request is by a 4-year-old."

**题目**

这是哪种提示词工程（Prompt Engineering）技术的示例？

**选项**

A. 少样本学习（Few-shot Learning）

B. 启示效应（Affordance）

C. 思维链（Chain of Thought）

D. 预设引导（Priming）

&nbsp;

---

**参考答案：D**

**解析：**

**预设引导（Priming）** 通过系统消息预先设定模型的角色、行为方式和输出风格：
- "你是一个帮助解决数学谜题的 AI 助手"→ 设定角色
- "用 4 岁小孩能理解的方式解释"→ 设定输出风格

这种通过初始上下文"预热"模型的技术称为 Priming（预设引导）。

- 少样本学习（A）：通过提供具体输入-输出示例来引导模型
- 思维链（C）：要求模型逐步推理（"Let's think step by step"）
- Affordance（B）：利用模型对特定上下文语境的自然理解能力

---

## 第 226 题

**背景**

你有一个 Azure AI Language 资源，需要配置一个**实体识别**功能，识别文本中的地点（Location）、人物（Person）和组织（Organization）。

随后，需要将识别结果中的实体（包括 Wikipedia 链接）包含在索引输出中。

你正在为 Azure AI Search 技能集编写 JSON 配置。

**题目**

在技能集 JSON 中：
- `categories` 参数应设置什么？
- `outputs` 中应包含哪个名称？

**选项**

A. `categories: ["Location","Person","Organization"]`；outputs 包含 `{"name":"entities"}`

B. `categories: ["Location","Person","Organization"]`；outputs 包含 `{"name":"namedEntities"}`

C. `categories: ["All"]`；outputs 包含 `{"name":"entities"}`

D. 不设置 categories（返回所有类型）；outputs 包含 `{"name":"linkedEntities"}`

&nbsp;

---

**参考答案：A**

**解析：**

在 Azure AI Search 实体识别技能（Entity Recognition Skill）中：

- **`categories`**：指定要提取的实体类别，`["Location", "Person", "Organization"]` 精确匹配需求
- **`outputs` 中的 `entities`**：返回的 `entities` 输出包含实体的完整信息，**包括 Wikipedia 链接**（wikis = true 时）

```json
{
  "@odata.type": "#Microsoft.Skills.Text.EntityRecognitionSkill",
  "categories": ["Location", "Person", "Organization"],
  "includeTypelessEntities": true,
  "outputs": [
    {"name": "entities", "targetName": "entities"},
    {"name": "namedEntities", "targetName": "namedEntities"}
  ]
}
```

`entities` 输出包含 Wikipedia 相关信息（URL、ID 等），而 `namedEntities` 仅包含基本实体信息，不含链接。

---

## 第 227 题

**背景**

你正在构建一个 Azure AI Search 自定义技能（Custom Skill），该技能通过调用外部 Web API 来获取组织的描述信息。

**题目**

关于该自定义技能的以下说法，哪项正确？

**选项**

A. 自定义技能只能作为技能集中的第一个技能

B. 自定义技能的输出不能映射到搜索索引字段

C. 该技能使用 `WebApiSkill` 类型定义，可以在技能集中调用外部 HTTP 端点

D. 自定义技能必须部署在 Azure Functions 中，不支持其他 HTTP 端点

&nbsp;

---

**参考答案：C**

**解析：**

Azure AI Search 自定义技能（Custom Skill）的特点：

- **类型**：在技能集 JSON 中使用 `"@odata.type": "#Microsoft.Skills.Custom.WebApiSkill"` ✅
- **位置**：可以是技能集中的任意位置（不限于第一个）
- **输出映射**：自定义技能的输出**可以**通过 `outputFieldMappings` 映射到搜索索引字段
- **部署方式**：支持任何可公开访问的 HTTP/HTTPS 端点，不限于 Azure Functions（Azure API Management、Azure App Service 等均可）

---

## 第 228 题

**背景**

你使用 Custom Vision 构建了一个图像分类模型，用于区分猫和狗的图像。在训练完成后，你需要**评估模型的性能**。

**题目**

Custom Vision 提供哪两个性能指标供评估？

**选项**

A. Recall（召回率）和 F-score

B. Weighted Accuracy（加权准确率）和 Precision（精确率）

C. Precision（精确率）和 Recall（召回率）

D. Area Under Curve (AUC) 和 Precision

&nbsp;

---

**参考答案：C**（注：原题 30 答案为 A/D，存在版本差异）

**解析：**

Custom Vision 训练完成后，在模型性能界面提供以下指标：

- **Precision（精确率）**：预测为某类的样本中，真正属于该类的比例
- **Recall（召回率）**：真正属于某类的样本中，被正确预测的比例
- **AP（Average Precision）**：各类别精确率的平均值

> ⚠️ **争议说明**：原题（30）答案为 A（Recall）和 D（Precision），与此题相同（Precision + Recall）。不同资料列出的指标略有差异（某些版本还列出 AP），但 Precision 和 Recall 是最标准的两个评估指标。

---

## 第 229 题

**背景**

你正在构建一个 Azure AI 解决方案，用于对用户生成的图像进行**实时内容审核**，防止用户分享性暗示图像。

**题目**

以下哪两种工具可以满足需求？（每个答案是完整解决方案）

**选项**

A. Microsoft Defender for Cloud Apps

B. Azure AI Custom Vision（自定义视觉）

C. Azure AI Vision（计算机视觉）

D. Azure AI Content Safety（内容安全）

E. Azure AI Document Intelligence

&nbsp;

---

**参考答案：C、D**

**解析：**

两种可以检测图像不当内容的方案：

- **Azure AI Vision（C）**：`Analyze Image` API 的 `Adult` 特性可以检测图像中的成人内容（`isAdultContent`、`isRacyContent`），无需训练，开发工作量极小
- **Azure AI Content Safety（D）**：专门的内容安全服务，`Image:analyze` 端点支持检测 Sexual、Violence、Hate、SelfHarm 四个类别，更全面

Azure AI Custom Vision（B）需要自定义训练标注数据，开发工作量大；Document Intelligence（E）用于文档分析，与图像内容审核无关。

---

## 第 230 题

**背景**

你构建了一个使用 LUIS 的语言模型，用于搜索联系人列表（意图：`Find Contact`）。

测试时发现，用户说 "Find contacts in London" 时，模型能正确识别意图，但无法提取 "London" 作为位置实体。

**题目**

应添加哪种实体类型来提取 "London" 这样的地名，且**最小化开发工作量**？

**选项**

A. 机器学习实体（Machine Learned entity）

B. 正则表达式实体（Regex entity）

C. 预构建 `geographyV2` 实体（Prebuilt geographyV2 entity）

D. 列表实体（List entity）

&nbsp;

---

**参考答案：C**

**解析：**

**预构建的 `geographyV2` 实体** 专门用于识别地理位置（国家、城市、省份等），无需提供训练示例即可使用：

```json
{
  "prebuiltEntities": [
    {"name": "geographyV2"}
  ]
}
```

它能自动识别 "London"、"Seattle"、"Ukraine" 等地名，与题目中的训练语料完全匹配，且无需标注训练数据，开发工作量最小。

机器学习实体（A）需要提供标注示例；Regex（B）无法覆盖所有城市名；列表实体（D）需要穷举所有可能的值。

---

## 第 231 题

**背景**

你正在使用 Azure AI 语言服务和 Cognitive Search 构建知识库，需要处理 wiki 内容，确保支持等价术语搜索（即搜索 "automobile" 时，包含 "car" 的文档也能被找到）。

**题目**

应在解决方案中包含什么？

**选项**

A. 同义词图（Synonym map）

B. 建议器（Suggester）

C. 自定义分析器（Custom analyzer）

D. 内置关键短语提取技能

&nbsp;

---

**参考答案：A**

**解析：**

**同义词图（Synonym Map）** 是 Azure AI Search 的功能，允许定义等价词组：

```json
{
  "synonyms": "automobile,car,vehicle\ncomputer,pc,laptop"
}
```

创建同义词图后，将其关联到索引字段，搜索时自动扩展查询词，无需用户明确知道同义词。

- 建议器（B）用于自动完成/建议，基于前缀匹配
- 自定义分析器（C）用于自定义分词逻辑，不是同义词扩展
- 关键短语提取（D）是富化技能，提取文档关键词，不实现搜索时的同义词扩展

---

## 第 232 题

**背景**

你正在使用 Azure AI 构建一个产品创建系统，需要为上传的产品图像**生成 Alt Text（辅助文本）**，以满足无障碍访问需求。

你使用 C# 调用 Computer Vision API。

**题目**

在代码中，应调用哪个方法来获取适合用作 Alt Text 的图像描述？

**选项**

A. `GetReadResultAsync()`

B. `DescribeImageInStreamAsync()`

C. `AnalyzeImageByDomainInStreamAsync()`

D. `TagImageInStreamAsync()`

&nbsp;

---

**参考答案：B**

**解析：**

`DescribeImageInStreamAsync()`（或其 URL 版本 `DescribeImageAsync()`）调用 Computer Vision 的 **Describe Image** 功能，返回：

```json
{
  "description": {
    "captions": [
      {"text": "a red coffee mug on a wooden table", "confidence": 0.95}
    ],
    "tags": ["coffee", "mug", "table", "red"]
  }
}
```

`captions[0].text` 是一个完整的自然语言句子，最适合用作图像的 Alt Text。

`GetReadResultAsync()`（A）用于 OCR 结果；`AnalyzeImageByDomainInStreamAsync()`（C）用于领域特定分析；`TagImageInStreamAsync()`（D）返回标签列表（不是句子）。

---

## 第 233 题

**背景**

你正在使用 Azure AI Content Safety 资源（resource1）构建一个社交媒体应用，需要检测用户上传图像中的有害内容。

**题目**

以下关于 Azure AI Content Safety 图像分析的说法，哪项正确？

**选项**

A. `severity` 分数的范围是 0 到 100

B. `severity` 分数是 0 到 7 的整数，0 表示无检测到内容

C. 图像 API 只能检测 Sexual 类别，不支持其他类别

D. 每次 API 调用只能检测一种内容类别

&nbsp;

---

**参考答案：B**

**解析：**

Azure AI Content Safety 图像分析响应的 `severity` 字段：

- 类型：**整数（0, 2, 4, 6 四个级别）**（部分文档描述为 0-7 范围）
- **0**：未检测到该类别的有害内容
- **2**：轻度
- **4**：中度
- **6**（或 7）：重度

支持四个类别：**Hate**、**SelfHarm**、**Sexual**、**Violence**，单次调用可同时检测多个类别。

---

## 第 234 题

**背景**

你有一个 Azure OpenAI 资源，部署了一个 GPT-4 模型，用于构建聊天机器人。你需要确保用户上传的**公司内部文件数据**被用于模型的回答（RAG 模式）。

**题目**

为了让模型使用上传的公司数据，应创建哪两种资源？

**选项**

A. Azure AI Bot Service 和 Azure SQL

B. Azure AI Document Intelligence 和 Azure SQL

C. Azure Blob Storage 和 Azure AI Search

D. Azure Logic Apps 和 Azure Cosmos DB

&nbsp;

---

**参考答案：C**

**解析：**

Azure OpenAI 的"在自有数据上使用（On Your Data）"功能通过以下架构实现：

1. **Azure Blob Storage**：存储原始文档文件（PDF、DOCX、TXT 等）
2. **Azure AI Search**：对文档内容创建向量索引，支持语义搜索

工作流：
- 文档上传到 Blob Storage
- AI Search 索引器自动处理文档，创建可搜索的知识库
- 用户提问时，Azure OpenAI 先查询 AI Search，将相关文档片段作为上下文提供给 GPT-4

---

## 第 235 题

**背景**

你正在构建一个应用，需要检测用户消息中的异常模式（如高频异常请求），使用 Azure AI Anomaly Detector 服务处理单条时间序列数据流。

**题目**

应使用哪种异常检测模式？

**选项**

A. 批处理检测（Batch Detection）

B. 流式/实时检测（Streaming/Real-time Detection）

C. 变化点检测（Change Point Detection）

D. 多变量检测（Multivariate Detection）

&nbsp;

---

**参考答案：B**

**解析：**

三种异常检测模式的适用场景：

| 模式 | 适用场景 |
|------|---------|
| **批处理检测（Batch）** | 对历史数据集进行离线分析，一次性扫描整个数据集 |
| **流式/实时检测（Streaming）** | 对实时数据流进行在线检测，每个新数据点到来时立即判断是否异常 ✅ |
| 变化点检测（Change Point） | 检测时间序列中长期趋势的变化点 |
| 多变量检测（Multivariate） | 分析多条相关时间序列之间的联合异常 |

题目要求检测"实时用户消息流"中的异常，应使用**流式/实时检测**。

---

## 第 236 题

**背景**

你正在为企业构建 Azure AI 解决方案，需要进行文档处理。有一批 **5,000 张扫描发票图像**需要提取金额、日期和供应商名称等关键字段。

**题目**

应使用哪个 Azure AI 服务？解决方案必须**最小化开发工作量**。

**选项**

A. Azure AI Custom Vision

B. Azure AI Personalizer

C. Azure AI Document Intelligence（使用预构建发票模型）

D. Computer Vision（使用 Read API）

&nbsp;

---

**参考答案：C**

**解析：**

**Azure AI Document Intelligence 预构建发票模型（prebuilt-invoice）** 专为发票信息提取设计，开箱即用，无需训练：

可提取字段包括：
- `VendorName`（供应商名称）
- `InvoiceTotal`（发票总金额）
- `InvoiceDate`（发票日期）
- `CustomerName`（客户名称）
- 明细行项目等

直接调用 API 上传发票图像，即可获得结构化的 JSON 提取结果，开发工作量最小。

Computer Vision Read API（D）只进行 OCR 文字提取，还需要额外的逻辑解析字段，工作量更大。

---

## 第 237 题

**背景**

你正在使用 Azure AI Search 对大型文档库进行索引，需要确保用户能够基于文档的**类别（category）字段**进行**下钻过滤导航（Faceted Navigation）**，同时能将 category 值显示在搜索结果中。

**题目**

除了 **Retrievable** 属性外，还需要为 category 字段启用哪个属性？

**选项**

A. Searchable（可搜索）

B. Sortable（可排序）

C. Facetable（可分面）

D. Filterable（可筛选）

&nbsp;

---

**参考答案：C**

**解析：**

**下钻过滤导航（Faceted Navigation）** 允许用户在搜索结果页面看到各类别的文档数量，并点击类别名称筛选结果。这需要字段启用 **Facetable** 属性。

- `Retrievable`：使字段值出现在搜索结果中（显示 category 值）
- `Facetable`：支持分面查询，启用下钻过滤导航 ✅
- `Searchable`：支持全文搜索，不是下钻导航所必需
- `Filterable`：允许在 `$filter` 中使用，但不自动提供分面统计

---

## 第 238 题

**背景**

你正在构建一个使用 Azure AI Vision 的图像分析应用，需要判断图像中的**人物年龄、情绪**等信息。

**题目**

以下关于 Computer Vision API 的说法，哪项正确？

**选项**

A. Computer Vision 的人脸检测可以精确识别个人身份

B. Computer Vision 的人脸功能可以检测人脸的大致年龄范围和基本属性，但**不进行身份识别**

C. Computer Vision 已完全替代 Azure Face API，两者功能相同

D. Computer Vision 人脸检测不返回置信度分数

&nbsp;

---

**参考答案：B**

**解析：**

- **Computer Vision** 的人脸检测（`Faces` 特性）仅返回基本信息：人脸位置、估计年龄范围等，**不进行个人身份识别**
- **Azure Face API** 提供更完整的人脸功能：人员识别（Identify）、相似人脸搜索、情感检测等

两者功能不同，不互相替代：
- Computer Vision：适合快速检测图像中是否有人脸，以及获取基本属性
- Face API：适合人员身份验证、识别等高级场景（需要申请受限访问权限）

---

## 第 239 题

**背景**

你正在开发一个应用，需要**实时检测用户文本消息中使用的语言**，以便路由到对应语言的客服团队。

**题目**

应使用哪个 Azure AI 服务？

**选项**

A. Azure AI Speech（语音检测）

B. Azure AI Content Safety（内容安全）

C. Azure AI Translator（文本翻译）

D. Azure AI Language（语言检测）

&nbsp;

---

**参考答案：D**

**解析：**

**Azure AI Language 服务**提供**语言检测（Language Detection）** 功能，可以识别文本中使用的语言并返回语言代码和置信度：

```python
response = client.detect_language(documents=["Bonjour! Comment allez-vous?"])
# 返回: {"language": "French", "iso6391Name": "fr", "confidenceScore": 0.99}
```

对于文本消息的语言检测，Azure AI Language 是最直接的选择。

Azure AI Translator（C）也提供语言检测功能（通过 `/detect` 端点），但其主要定位是翻译服务；Azure AI Language 的语言检测功能更专注且 API 更简洁。

> ⚠️ **注意**：题目 329 给出的答案是 A（Azure.AI.Translation.Text 包），而题目 344 答案是 D（Azure AI Language）。两个服务都能检测语言，具体选哪个取决于题目中的其他约束条件（如是否需要同时翻译、SDK 包要求等）。

---

## 第 240 题

**背景**

你有一个使用 Azure AI Language 自定义问题解答服务的聊天机器人，需要确保机器人在**回答问题时，仅在置信度分数达到 95% 或以上时才给出回答**，低于此阈值时返回默认消息。

**题目**

在调用 `generateAnswer` API 时，应在请求体中设置哪个参数？

**选项**

A. `"confidenceThreshold": 95`

B. `"scoreThreshold": 0.95`

C. `"minimumScore": 95`

D. `"threshold": 0.95`

&nbsp;

---

**参考答案：B**

**解析：**

Azure AI Language 自定义问题解答的 `generateAnswer` 端点：

```json
POST {endpoint}/language/query-knowledgebases/projects/{project}/deployments/{deployment}/query
{
  "question": "用户问题",
  "scoreThreshold": 0.95,
  "top": 1
}
```

- 参数名：**`scoreThreshold`**（而非 confidenceThreshold 或 minimumScore）
- 值范围：0.0 到 1.0 的浮点数（0.95 = 95%）
- 当最高匹配答案的分数低于此值时，返回 "No good match found" 默认响应

---

## 第 241 题

**背景**

你有一个 Azure DevOps 流水线，用于部署一个使用 Azure AI Search 的应用。你怀疑查询密钥已被泄露，需要在**最小化停机时间**的前提下更换密钥。

**题目**

应按什么顺序执行以下操作？

**选项**（将以下三项排序）

A. 向 Azure AI Search 添加新查询密钥

B. 将应用配置更新为使用新查询密钥

C. 删除被泄露的旧查询密钥

&nbsp;

---

**参考答案：A → B → C**

**解析：**

零停机密钥轮换的标准流程（针对查询密钥）：

1. **创建新查询密钥（A）**：在 Azure AI Search 的"密钥（Keys）"页面创建新的查询密钥，此时旧密钥仍有效，应用不中断
2. **更新应用配置（B）**：将 Web 应用、API 或 CI/CD 流水线中的查询密钥替换为新密钥，完成后验证应用正常运行
3. **删除旧密钥（C）**：确认新密钥正常工作后，删除被泄露的旧密钥，彻底阻断未授权访问

此流程确保在任何时刻都有有效密钥，无需停机。

---

## 第 242 题

**背景**

你正在构建一个 Azure OpenAI 应用，使用 Chat Completions API。你需要提高聊天机器人的回答质量，且**最小化开发工作量**。

**题目**

哪两种方法可以提高响应质量？（每个答案都是完整解决方案）

**选项**

A. 对模型进行微调（Fine-tune）

B. 提供上下文内容作为接地数据（Grounding content）

C. 在请求中添加示例请求/响应对（Sample request/response pairs）

D. 用自有数据重新训练语言模型

E. 训练自定义大型语言模型（LLM）

&nbsp;

---

**参考答案：B、C**

**解析：**

不需要训练/微调的两种最小开发工作量方法：

- **接地数据（B）**：在提示词中提供相关背景信息（如从知识库检索的文档片段），让模型基于事实数据回答，减少幻觉
- **示例对（C）**：在对话历史中包含几个示例问答对（Few-shot prompting），引导模型按照期望的格式和风格回答

微调（A）、重新训练（D）、训练自定义 LLM（E）均需要大量数据和计算资源，开发工作量大。

---

## 第 243 题

**背景**

你正在使用 Azure AI 语言服务中的**自定义问题解答（Custom Question Answering）** 功能，需要将一个 QnA 项目从一个 Language Service 实例迁移到**另一个 Azure 区域**的 Language Service 实例。

**题目**

应按顺序执行哪三项操作？

**选项**（选三项并排序）

A. 从源项目导出问答数据（Export the project）

B. 在目标 Language Service 实例中创建新项目

C. 将导出的数据导入新项目（Import to new project）

D. 在 Language Studio 中重新训练并重新发布新项目

E. 删除源项目

&nbsp;

---

**参考答案：A → B → C**（后续还需 D）

**解析：**

跨区域迁移自定义问题解答项目的步骤：

1. **导出项目（A）**：在 Language Studio 中导出现有项目（生成 JSON/TSV 格式文件，包含所有问答对）
2. **在目标实例创建新项目（B）**：在目标区域的 Language Service 实例中创建一个新的问题解答项目
3. **导入数据（C）**：将导出文件导入新项目

完成后还需要重新训练和发布（D），但题目问的是"迁移"的核心三步，通常答案为 A → B → C（或 A → C → D 取决于是否先建项目）。

---

## 第 244 题

**背景**

你正在使用 Azure AI Video Indexer 为公司内部培训视频生成脚本/转录，但发现服务无法准确转录**技术术语和行业专用词汇**。

**题目**

应如何提高转录的准确性？

**选项**

A. 创建自定义语言模型（Custom Language Model）并将技术术语添加进去

B. 仅对视频配置音频索引（Configure audio indexing for video only）

C. 为视频启用多语言检测（Enable multi-language detection）

D. 为演讲者构建自定义人物模型（Build a custom Person model）

&nbsp;

---

**参考答案：A**

**解析：**

Azure AI Video Indexer 的**自定义语言模型（Custom Language Model）** 功能允许：
- 上传包含行业专用词汇、产品名称、技术术语的文本文件（TXT 格式）
- Video Indexer 在转录时优先识别这些自定义词汇

这直接解决了技术术语识别不准确的问题，是 "Can transcribe jargon with high accuracy"（能以高准确率转录行业术语）需求的标准解决方案。

---

## 第 245 题

**背景**

你正在使用 Azure OpenAI Studio 构建一个聊天机器人。你需要确保机器人在回答问题时，**优先使用你上传的公司内部数据**（而非模型训练数据）来生成答案。

**题目**

在代码中，应在 API 请求的哪个参数中指定数据源配置？

**选项**

A. `system_message`（系统消息）

B. `data_sources`（数据源）

C. `context`（上下文）

D. `grounding`（接地）

&nbsp;

---

**参考答案：B**

**解析：**

Azure OpenAI 的"使用自有数据"功能通过 `data_sources` 参数实现：

```python
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "question"}],
    extra_body={
        "data_sources": [{
            "type": "azure_search",
            "parameters": {
                "endpoint": "https://search.search.windows.net",
                "index_name": "your-index",
                "authentication": {
                    "type": "system_assigned_managed_identity"
                }
            }
        }]
    }
)
```

`data_sources` 告知 OpenAI API 在生成回答前先查询指定的 Azure AI Search 索引，使回答基于索引中的文档。

---

## 第 246 题

**背景**

你使用 Azure OpenAI 构建了一个聊天机器人，需要确保机器人**不会返回能够识别特定个人身份的内容**（如从训练数据中泄露的个人信息）。

**题目**

应为 Azure OpenAI 资源配置哪项功能？

**选项**

A. Azure AI Content Safety 的越狱检测（Jailbreak risk detection）

B. Azure AI Content Safety 的受保护材料检测（Protected material detection）

C. Azure OpenAI 的内容过滤器（Content Filter）中的个人数据检测

D. Azure AI Language 的 PII 检测

&nbsp;

---

**参考答案：B**

**解析：**

**受保护材料检测（Protected material detection）** 是 Azure AI Content Safety 的功能，用于检测模型输出中是否包含：
- 受版权保护的文本内容
- **个人可识别信息（PII）**
- 其他受保护的材料

当模型输出触发受保护材料检测时，可以自动拦截或替换相关内容，防止训练数据中的个人信息被泄露。

越狱检测（A）用于防止绕过安全限制的攻击；内容过滤器（C）主要针对有害类别（仇恨、暴力等）；PII 检测（D）在 Language 服务中处理用户输入，不是针对模型输出。

---

## 第 247 题

**背景**

你有一个 Azure 订阅，需要使用 **Azure Resource Manager（ARM）模板**部署 Azure OpenAI 资源，并确保部署后的资源**能够处理每分钟 600 个请求**（约 60,000 TPM）。

**题目**

在 ARM 模板的部署（Deployment）资源中，`sku.capacity` 应设置为多少？

**选项**

A. `"capacity": 600`

B. `"capacity": 60`

C. `"capacity": 6`

D. `"capacity": 6000`

&nbsp;

---

**参考答案：B**

**解析：**

Azure OpenAI 部署的 `sku.capacity` 以**千 Token 每分钟（K TPM）** 为单位：

- `capacity: 60` = 60,000 TPM（Tokens Per Minute）
- 标准推断：60,000 TPM ≈ 600 RPM（每分钟请求数，假设每个请求平均 100 tokens）

ARM 模板示例：
```json
{
  "type": "Microsoft.CognitiveServices/accounts/deployments",
  "sku": {
    "name": "Standard",
    "capacity": 60
  }
}
```

注意：capacity 单位是 K TPM（千），而非 TPM（token）或 RPM（请求）。

---

## 第 248 题

**背景**

你正在使用 Azure AI Language 服务对文本进行分析，你有如下 Python 代码：

```python
def get_key_phrases(client, text):
    result = client.extract_key_phrases([text])[0]
    return list(result.key_phrases)
```

调用：`get_key_phrases(client, "the cat sat on the mat")`

**题目**

以下说法哪些正确？（判断三项）

1. 函数返回关键短语列表
2. "the" 会被包含在返回的关键短语中
3. 返回结果中每个短语都有置信度分数

**选项**

A. 1-是，2-是，3-是

B. 1-是，2-否，3-否

C. 1-否，2-否，3-是

D. 1-是，2-是，3-否

&nbsp;

---

**参考答案：B**

**解析：**

1. **正确**：`extract_key_phrases()` 确实返回关键短语列表（Python SDK 中为 `result.key_phrases`）
2. **错误**：`"the"` 是英语停用词，没有独立语义价值，不会被提取为关键短语。对于 "the cat sat on the mat"，可能提取 "cat" 和 "mat"
3. **错误**：关键短语提取 API **不返回置信度分数**，只返回短语字符串列表（与命名实体识别不同，NER 返回置信度）

---

## 第 249 题

**背景**

你正在为一家国际公司构建 Azure AI 解决方案，需要实现**批量文档翻译**功能。源文档为德语的 Word 文档和 PowerPoint 演示文稿，需要翻译为法语，同时：

- 保留原始文件的格式和样式
- 使用公司专有的**自定义术语表**确保行业术语翻译一致性

**题目**

以下关于 Azure AI Translator 批量文档翻译的说法，哪项正确？

**选项**

A. 批量文档翻译只支持 TXT 格式，不支持 DOCX 或 PPTX

B. 批量文档翻译在翻译 DOCX 和 PPTX 时会丢失原始格式

C. 批量文档翻译支持自定义术语表，并可以在翻译 DOCX/PPTX 时保留格式

D. 自定义术语表必须为 PDF 格式

&nbsp;

---

**参考答案：C**

**解析：**

Azure AI Translator **批量文档翻译（Document Translation）** 服务的特性：

- **支持格式**：DOCX、PPTX、XLSX、PDF、HTML、TXT 等多种格式 ✅
- **格式保留**：翻译后保持原始文档的布局、字体、表格、图片位置等样式 ✅
- **自定义术语表**：支持 TSV 或 XLIFF 格式的术语表文件，确保专业词汇翻译一致性 ✅
- 术语表格式为 **TSV 或 XLIFF**，不是 PDF

---

## 第 250 题

**背景**

你正在使用 Azure AI Speech 服务构建一个**转录技术播客**的服务。在测试中发现，服务无法准确识别技术术语（如 API 名称、编程语言关键词等）。

你需要提高转录准确性。

**题目**

应按顺序执行哪五项操作？

**选项**（选五项并排序）

A. 在 Speech Studio 中创建项目，选择语音资源

B. 上传测试音频数据（Upload test data）

C. 上传训练数据（包含技术术语的文本/音频）

D. 训练自定义模型

E. 部署自定义模型到端点

F. 在测试前后评估模型准确率

&nbsp;

---

**参考答案：A → B → C → D → E**（F 可在 D 前后进行）

**解析：**

Custom Speech 模型训练流程（与原题 240 一致）：

1. **创建项目（A）**：在 Speech Studio 中新建 Custom Speech 项目
2. **上传测试数据（B）**：上传评估用的音频和转录文本，用于训练前后对比
3. **上传训练数据（C）**：包含技术术语的文本语料（相关文本）和/或带标注的音频
4. **训练模型（D）**：使用上传的数据训练自定义语音模型
5. **部署到端点（E）**：将训练好的模型部署为自定义端点，应用程序使用该端点进行转录

---

## 第 251 题

**背景**

你正在使用 Azure AI Translator 服务构建一个翻译应用，需要通过 REST API 翻译文本。

应用使用多服务 Azure AI Translator 资源（Translator1），需要为 API 请求构建正确的 HTTP 请求头。

**题目**

应在请求头中包含哪些内容？

**选项**

A. 订阅密钥（Subscription Key）和客户端追踪 ID（Client Trace ID）

B. 订阅密钥（Subscription Key）、订阅区域（Subscription Region）和内容类型（Content-Type）

C. 资源 ID 和内容语言（Content-Language）

D. 访问控制请求（Access-Control-Request）、内容类型和内容长度

&nbsp;

---

**参考答案：B**

**解析：**

调用 Azure AI Translator REST API 所需的请求头：

```http
POST https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=zh-Hans
Ocp-Apim-Subscription-Key: {your-key}
Ocp-Apim-Subscription-Region: eastus
Content-Type: application/json
```

三个必要头：
1. **`Ocp-Apim-Subscription-Key`**（订阅密钥）：身份验证
2. **`Ocp-Apim-Subscription-Region`**（订阅区域）：多服务资源使用时必须提供
3. **`Content-Type: application/json`**：请求体格式

---

## 第 252 题

**背景**

你正在使用 Azure AI Video Indexer 服务为公司视频提供搜索界面。需要根据**视频中出现的人物**来搜索视频。

**题目**

应采取什么措施？

**选项**

A. 创建人物模型（Person Model）并将其关联到视频

B. 创建人物对象并为每个人提供面部图像

C. 邀请所有员工到 Video Indexer

D. 编辑视频中的面部

E. 将姓名上传到语言模型

&nbsp;

---

**参考答案：A**

**解析：**

Azure AI Video Indexer 通过**自定义人物模型（Custom Person Model）** 实现基于人物的视频搜索：

1. 创建人物模型（可包含多人）
2. 为每个人添加面部示例图像
3. 在上传/重新索引视频时关联该人物模型

Video Indexer 会在索引视频时识别这些人物，之后可以通过人物姓名搜索视频中的特定片段。

---

## 第 253 题

**背景**

你正在使用 Face API 开发一个**员工考勤打卡**应用，需要通过摄像头识别员工身份。员工总数为 10,000 人。

**题目**

在设计 Face API 调用时，应使用哪种数据结构来存储员工人脸数据？

**选项**

A. FaceList（最多 1,000 张人脸）

B. LargeFaceList（最多 1,000,000 张人脸）

C. PersonGroup（每组最多 10,000 人，每人最多 248 张图）

D. LargePersonGroup（每组最多 1,000,000 人）

&nbsp;

---

**参考答案：D**

**解析：**

两组数据结构的区别：

| 数据结构 | 最大容量 | 适用场景 |
|---------|---------|---------|
| FaceList | 1,000 张人脸 | 小规模相似人脸搜索 |
| LargeFaceList | 1,000,000 张人脸 | 大规模相似人脸搜索 |
| PersonGroup | 10,000 人 | 中小规模人员识别 |
| **LargePersonGroup** | **1,000,000 人** | 大规模人员识别 ✅ |

员工考勤需要识别**身份**（哪个人），适合 PersonGroup/LargePersonGroup；10,000 名员工虽然在 PersonGroup 的上限之内，但使用 **LargePersonGroup** 更具扩展性。

> ⚠️ **注意**：Azure Face API 的人员识别功能属于受限访问功能，需要申请才能使用。

---

## 第 254 题

**背景**

你有一个 Azure AI Search 服务，富化管道中包含一个自定义技能（Custom Skill），该技能对文档进行语言检测和情感分析。

**题目**

自定义技能的输出可以映射到搜索索引的字段吗？

**选项**

A. 是的，通过在索引器定义中使用 `outputFieldMappings` 实现

B. 否，自定义技能的输出只能存储在知识存储中

C. 是的，但只有当技能位于技能集的最后一个位置时

D. 否，自定义技能的输出格式与搜索索引不兼容

&nbsp;

---

**参考答案：A**

**解析：**

自定义技能（Custom Skill）的输出完全可以通过索引器的 `outputFieldMappings` 映射到搜索索引字段：

```json
{
  "outputFieldMappings": [
    {
      "sourceFieldName": "/document/pages/*/sentiment",
      "targetFieldName": "sentiment"
    }
  ]
}
```

这是 Azure AI Search 富化管道的标准功能，自定义技能与内置技能的输出映射方式完全相同。技能在技能集中的位置不影响输出映射能力。

---

## 第 255 题

**背景**

你正在构建一个使用 Azure OpenAI 的聊天机器人。系统消息配置为：

> "You are an AI assistant that helps people find information."

用户问："What are the top 5 programming languages in 2025?"

模型回答包含了详细的排名信息。

**题目**

以下关于该场景中的 Azure OpenAI 配置的说法，哪项正确？

**选项**

A. 将 Temperature 设为 0 可以确保模型每次对同一问题返回完全相同的答案

B. 将 Max tokens 设为 50 可能导致回答在列出全部 5 种语言之前就被截断

C. 系统消息中的角色定义会被用户消息自动覆盖

D. Azure OpenAI 模型能够访问 2025 年的实时网络数据

&nbsp;

---

**参考答案：B**

**解析：**

- **B（正确）**：`max_tokens` 限制模型生成的最大 Token 数。列出 5 种编程语言加上描述可能需要 100+ tokens，若限制为 50 tokens，回答可能在中途被截断

- A（错误）：Temperature=0 使输出接近确定性，但对于涉及排名的问题（存在多种合理答案），即使 Temperature=0 也可能因模型版本、系统消息等因素导致输出略有不同

- C（错误）：系统消息定义的角色和指令不会被用户消息覆盖（除非特殊 jailbreak 攻击），系统消息优先级高于用户消息

- D（错误）：Azure OpenAI 模型基于训练数据，没有实时网络访问能力（除非配置了 RAG 或 Bing 搜索工具）

---

## 第 256 题

**背景**

你正在开发一个使用 Azure AI 的解决方案，需要确保 AI 系统的输出**对所有用户都公平公正**，不会因用户的地理位置或背景产生歧视性结果。

**题目**

这体现了微软负责任 AI 原则中的哪两项原则？

**选项**

A. 透明性（Transparency）和公平性（Fairness）

B. 公平性（Fairness）和包容性（Inclusiveness）

C. 可靠性与安全（Reliability and Safety）和隐私与安全（Privacy and Security）

D. 问责制（Accountability）和透明性

&nbsp;

---

**参考答案：B**

**解析：**

题目描述的场景涉及：

- **公平性（Fairness）**：AI 系统不因用户的地理位置、种族、性别等因素产生偏见，对所有人提供公平结果
- **包容性（Inclusiveness）**：AI 系统应该赋能所有人，包括来自不同背景和地区的用户

这两个原则共同确保 AI 系统在设计时考虑到多样性和公平待遇。

---

## 第 257 题

**背景**

你正在构建一个使用 Azure AI Speech 服务的**零售导购机器人**，机器人需要使用**自定义神经语音（Custom Neural Voice）**，该语音为机器人的声音形象服务。

在创建自定义神经语音时，你已经获取了声音原型人的录音样本和同意书。

**题目**

接下来，应将**什么内容上传**到声音人才档案（Voice Talent Profile）？

**选项**

A. 一个 5 分钟的 WAV 或 MP3 文件，内容为声音原型人描述导购系统

B. 一个 5 分钟的 FLAC 音频文件和对应的 Word 格式转录文稿

C. 一个 WAV 或 MP3 文件，内容为声音原型人同意创建其合成声音版本的声明

D. 一个包含多个 10 秒 WAV 文件及对应 TXT 格式转录文稿的 ZIP 文件

&nbsp;

---

**参考答案：C**

**解析：**

声音人才档案（Voice Talent Profile）要求上传**声音原型人的同意声明录音（Consent Statement Recording）**：

- 格式：WAV 或 MP3
- 内容：声音原型人亲口读出同意创建其合成声音版本的标准声明
- 这是微软负责任 AI 要求的必要步骤，确保声音使用的合法授权

注意区别：
- 同意声明文件（C）→ 上传到**声音人才档案**（一次性）
- 训练数据（多个 WAV + TXT）→ 上传到**训练数据集**（用于实际训练）

---

## 第 258 题

**背景**

你有一个 Azure AI Content Safety 资源（resource1）。你需要构建一个系统来识别包含**仇恨（Hate）** 类别内容的用户请求。

你在应用代码中使用 Azure AI Content Safety SDK 进行检测。

**题目**

以下哪项代码片段能够正确识别仇恨内容并获取严重性评分？

**选项**

A. 使用 `ContentSafetyClient.analyze_text()`，categories 设为 `[TextCategory.HATE]`，从 `response.hate_result.severity` 获取分数

B. 使用 `TextAnalyticsClient.analyze_sentiment()`，从负面情感分数判断仇恨内容

C. 使用 `ContentSafetyClient.analyze_image()`，categories 设为 `[ImageCategory.HATE]`

D. 使用 `AzureOpenAIClient.chat_completions()`，在系统消息中要求检测仇恨内容

&nbsp;

---

**参考答案：A**

**解析：**

Azure AI Content Safety SDK（Python）的正确用法：

```python
from azure.ai.contentsafety import ContentSafetyClient
from azure.ai.contentsafety.models import AnalyzeTextOptions, TextCategory

client = ContentSafetyClient(endpoint, credential)
request = AnalyzeTextOptions(
    text="input text",
    categories=[TextCategory.HATE]
)
response = client.analyze_text(request)

# 获取仇恨类别的严重性评分
for item in response.categories_analysis:
    if item.category == TextCategory.HATE:
        print(f"Hate severity: {item.severity}")
```

`TextAnalyticsClient`（B）是 Azure AI Language 的客户端，情感分析不等同于仇恨内容检测；`analyze_image()`（C）用于图像内容检测。

---

## 第 259 题

**背景**

你正在使用 Azure AI Translator 服务将文本从英语翻译成希腊语（el），并需要翻译结果包含**使用罗马字母（Latin script）的音译**。

你有基础 URI：
```
https://api.cognitive.microsofttranslator.com/translate?api-version=3.0
```

**题目**

应额外添加哪三个查询参数？

**选项**

A. `toScript=Cyrl`、`from=el`、`textType=html`

B. `to=el`、`textType=html`、`toScript=Latn`

C. `from=en`、`to=el`、`textType=plain`

D. `to=el`、`toScript=Latn`、`textType=html`

&nbsp;

---

**参考答案：B 或 D**（取决于内容是否为 HTML）

**解析：**

必须包含的三个参数：

1. **`to=el`**：指定目标语言为希腊语（必填）
2. **`toScript=Latn`**：指定翻译结果使用拉丁（罗马）字母音译（满足"罗马字母音译"要求）
3. **`textType=html`**：如果源内容是网页（HTML 格式）则使用此参数；若为纯文本则使用 `textType=plain`

题目说"接收网页内容"，所以 `textType=html` 是正确的，**选项 B** 正确。

---

## 第 260 题

**背景**

你正在构建一个可视化 Azure AI 解决方案的监控仪表盘。你需要了解 Azure OpenAI 资源的 `Temperature` 参数对输出的影响。

**题目**

以下关于 Azure OpenAI Temperature 参数的说法，哪项正确？

**选项**

A. Temperature=0 时，模型无法生成任何输出

B. Temperature=2 时，模型总是生成最高质量的回答

C. Temperature 越低，模型输出越趋于确定性和一致性；Temperature 越高，输出越多样和创造性

D. Temperature 参数不影响模型输出，只影响响应速度

&nbsp;

---

**参考答案：C**

**解析：**

Temperature 参数控制模型词汇选择的随机性：

| Temperature 值 | 效果 |
|--------------|------|
| 接近 0 | 几乎总是选择最高概率的词，输出确定性强、重复度高 |
| 0.7（推荐默认） | 平衡创造性和准确性 |
| 接近 2 | 词汇选择高度随机，输出多样但可能不连贯 |

Temperature=0 不会阻止模型输出，只会使其选择最优路径；Temperature=2 不保证质量，只保证多样性。

---

## 第 261 题

**背景**

你正在使用 Azure AI 语言服务中的**对话语言理解（Conversational Language Understanding，CLU）** 为智能家居构建控制模型。

支持的语料包括：
- "Set all the lights to on."
- "Turn off the lights in the living room."
- "What is the current thermostat temperature?"
- "Lower the temperature of the thermostat by five degrees."

**题目**

应向模型添加哪三个元素（每个正确答案都是解决方案的一部分）？

**选项**

A. 位置（location）意图

B. change setting（更改设置）实体

C. device（设备）意图

D. change setting（更改设置）意图

E. query setting（查询设置）意图

F. device（设备）实体

&nbsp;

---

**参考答案：D、E、F**

**解析：**

分析四条语料的意图和实体：

| 语料 | 意图 | 实体 |
|------|------|------|
| "Set/Turn off the lights" | **change setting（D）** | device: lights |
| "What is the temperature?" | **query setting（E）** | device: thermostat |
| "Lower temperature by 5 degrees" | **change setting（D）** | device: thermostat, value: 5 |

- **`change setting` 意图（D）**：涵盖修改设备状态的操作
- **`query setting` 意图（E）**：涵盖查询设备当前状态的操作
- **`device` 实体（F）**：从语料中提取操作的目标设备（lights、thermostat）

> ⚠️ **争议说明**：原题（176）给出的答案为 B（change setting entity）、C（device intent）、F（device entity），与此题略有不同。本题的答案 D、E、F 更符合 CLU 意图设计的最佳实践（两个意图 + 一个实体），而原题将"device"设计为意图。请参考具体考试版本的标准答案。

---

## 第 262 题

**背景**

你正在构建一个社交媒体监控应用，需要**衡量品牌在社交媒体上的公众认知**，通过自然语言处理分析。

**题目**

应使用哪个 Azure 服务？

**选项**

A. Content Moderator（内容审核）

B. Form Recognizer（表单识别）

C. Computer Vision（计算机视觉）

D. Azure AI Language 服务（语言服务）

&nbsp;

---

**参考答案：D**

**解析：**

**Azure AI Language 服务** 的**情感分析（Sentiment Analysis）** 功能专门用于：
- 分析文本中的正面/负面/中性情感
- 评估品牌的公众认知
- 挖掘客户意见（Opinion Mining）

通过对大量社交媒体帖子进行情感分析，可以得到品牌的整体情感趋势和具体评价，是"衡量品牌公众认知"的标准 AI 解决方案。

---

## 第 263 题

**背景**

你在为 Azure OpenAI GPT-4 模型配置内容过滤器，以防止模型生成仇恨言论相关内容。

**题目**

以下哪项是 Azure OpenAI 内容过滤器（Content Filter）的正确描述？

**选项**

A. 内容过滤器只能过滤用户输入（Prompt），不能过滤模型输出（Completion）

B. 内容过滤器同时对用户输入和模型输出进行实时过滤，任一触发都会拦截请求或响应

C. 内容过滤器只在微调（Fine-tuning）后的模型上生效

D. 内容过滤器完全由用户自行配置，Azure 不提供任何默认过滤

&nbsp;

---

**参考答案：B**

**解析：**

Azure OpenAI 内容过滤器（Content Filter）的工作机制：

- **双向过滤**：同时检测**用户输入（Prompt）** 和**模型输出（Completion）** ✅
- 检测类别：Hate、Violence、Sexual、Self-harm（四个类别）
- 每个类别都有**严重性级别**（Safe、Low、Medium、High）
- 可以为每个类别独立配置过滤阈值
- **默认开启**：所有 Azure OpenAI 资源都有默认内容过滤器

若用户输入触发过滤，API 返回 400 错误；若模型输出触发过滤，该输出被拦截。

---

## 第 264 题

**背景**

你正在为公司构建一个 Azure AI Search 解决方案，需要确保不同的应用程序对搜索索引只有读取权限，同时防止来自互联网的直接访问。

**题目**

应分别采取哪两项措施？

**选项**

A. 防止互联网访问 → 配置 IP 防火墙规则；只读权限 → 使用查询密钥（Query Key）

B. 防止互联网访问 → 部署私有端点（Private Endpoint）；只读权限 → 使用查询密钥（Query Key）

C. 防止互联网访问 → 配置 NSG；只读权限 → 分配 RBAC Reader 角色

D. 防止互联网访问 → 部署私有端点；只读权限 → 分配 RBAC Contributor 角色

&nbsp;

---

**参考答案：B**

**解析：**

- **防止互联网访问**：**私有端点（Private Endpoint）** 使 Azure AI Search 只能通过 Azure 虚拟网络内部访问，完全阻断来自公共互联网的流量（比 IP 防火墙规则更彻底）

- **只读访问**：**查询密钥（Query Key）** 是 Azure AI Search 特有的只读密钥，只允许对文档集合进行搜索查询，**无法进行任何写操作**（如索引管理、文档更新等）

RBAC 角色（如 Reader）控制的是资源管理层面的权限，不是数据层面的读写控制。

---

## 第 265 题

**背景**

你正在为一个 Azure AI 解决方案实施安全措施。该解决方案包含一个 Azure OpenAI 资源（AI1）和一个 Azure AI Content Safety 资源（CS1）。

你需要**优化内容过滤配置**，通过运行示例问题来测试是否能有效拦截有害内容。

**题目**

从 Content Safety Studio 使用**文本内容审核（Moderate text content）** 功能运行测试，是否满足该需求？

**选项**

A. 是（Yes），该功能专门用于测试和优化内容过滤配置

B. 否（No），应使用"Protected material detection"功能

C. 否（No），应使用"Jailbreak risk detection"功能

D. 否（No），应在 Azure OpenAI Studio 中直接测试，而非 Content Safety Studio

&nbsp;

---

**参考答案：A**

**解析：**

**Content Safety Studio 的"Moderate text content"** 功能允许：
1. 输入示例文本（包括可能有害的内容）
2. 查看各个类别（Hate、Violence、Sexual、Self-harm）的检测结果和严重性评分
3. 调整检测阈值配置
4. 验证过滤策略是否有效

这正是"运行示例问题以测试和优化内容过滤配置"所需的功能。

> ⚠️ **争议说明**：原题（307）给出的答案是 B（No），即认为"Moderate text content"不满足需求，应使用其他功能。但从逻辑分析，"Moderate text content"确实是专门用于文本内容检测测试的功能。多个版本的答案存在分歧，请以最新官方考试指南为准。

---

## 第 266 题

**背景**

你正在开发一个多轮对话的 Azure Bot。用户在对话中提供了姓名，你需要在对话结束后**自动清除**该属性，以保护用户隐私。

**题目**

应将存储用户姓名的属性分配到哪个范围（Scope）？

**选项**

A. dialog（对话作用域）

B. user（用户作用域）

C. turn（轮次作用域）

D. conversation（会话作用域）

&nbsp;

---

**参考答案：A**

**解析：**

Bot Framework Composer 中的状态范围：

| 作用域 | 生命周期 | 适用场景 |
|-------|---------|---------|
| **dialog（对话）** | 对话（Dialog）活跃期间；对话结束时自动清除 ✅ | 对话流程内的临时数据 |
| user（用户） | 永久保留，不自动过期 | 需要跨对话保留的用户偏好 |
| conversation（会话） | 整个对话会话期间 | 会话级共享状态 |
| turn（轮次） | 单次请求-响应，轮次结束即清除 | 极短暂的临时数据 |

题目要求"对话结束后自动清除"，精确匹配 **dialog 作用域**的生命周期。

---

## 第 267 题

**背景**

你正在为 Azure AI Translator 服务的批量文档翻译构建流程。源文档存储在 Azure Blob Storage 的 German-files 容器中，目标是将翻译后的法语文件存储到 French-files 容器。

你已将原始 Word 文档上传到 German-files 容器，并准备好自定义术语表。

**题目**

接下来应按顺序执行哪三项操作？

**选项**（选三项并排序）

A. 将术语表文件（TSV 格式）上传到 Blob 容器

B. 向批量翻译 API 提交翻译请求，指定源容器、目标容器、语言对（de→fr）和术语表 URL

C. 等待翻译完成（轮询翻译状态 API）

D. 创建新的 Azure AI Translator 资源

E. 在 Azure 门户中配置防火墙规则

&nbsp;

---

**参考答案：A → B → C**

**解析：**

假设 Translator 资源和 Blob 容器已存在，批量文档翻译的步骤：

1. **上传术语表（A）**：将 TSV 格式的自定义术语表上传到 Blob 容器，获取其 SAS URL（供翻译请求引用）
2. **提交翻译请求（B）**：调用 `POST /batches` 端点，在请求体中指定：
   - 源容器 SAS URL（German-files）
   - 目标容器 SAS URL（French-files）
   - 语言对：`sourceLanguage: "de"`, `targetLanguage: "fr"`
   - 术语表 SAS URL
3. **轮询状态等待完成（C）**：批量翻译是异步操作，需要定期调用状态查询 API 直到 `status: "Succeeded"`

---

## 第 268 题

**背景**

你有一个运行自 Docker 容器的 Azure AI Text Analytics 情感分析服务，端点为 `https://contoso.cognitiveservices.azure.com`。

你需要**在 Azure 虚拟机上运行该容器**。

**题目**

在 `docker run` 命令中，应使用哪个容器镜像名称？

**选项**

A. `azure-cognitive-services/textanalytics/sentiment:latest`

B. `mcr.microsoft.com/azure-cognitive-services/textanalytics/sentiment:latest`

C. `microsoft/cognitiveservices-textanalytics-sentiment:latest`

D. `mcr.microsoft.com/cognitiveservices/textanalytics:sentiment`

&nbsp;

---

**参考答案：B**

**解析：**

Azure AI 服务容器镜像托管在 **Microsoft Container Registry (MCR)**，完整镜像路径格式为：

```
mcr.microsoft.com/azure-cognitive-services/{service}/{feature}:{tag}
```

情感分析容器的完整 `docker run` 命令：
```bash
docker run --rm -it -p 5000:5000 \
  mcr.microsoft.com/azure-cognitive-services/textanalytics/sentiment \
  Eula=accept \
  Billing=https://contoso.cognitiveservices.azure.com \
  ApiKey={your-key}
```

容器镜像从 MCR（`mcr.microsoft.com`）拉取，不是 Docker Hub。

---

## 第 269 题

**背景**

你正在评估 Azure AI Agent Service 的文件上传功能。你需要了解**可以上传到该服务的文件总大小上限**。

**题目**

Azure AI Agent Service 允许上传的文件总大小上限是多少？

**选项**

A. 1 GB

B. 10 GB

C. 100 GB

D. 1 TB

&nbsp;

---

**参考答案：C**

**解析：**

根据 Azure AI Agent Service 的官方规格，**可以上传到服务的所有文件的最大总大小为 100 GB**。

这个限制适用于 File Search 工具使用的所有文件的累计大小。对于需要处理更大规模文件的场景，建议使用 Azure AI Search 索引器替代直接文件上传。

---

## 第 270 题

**背景**

你正在使用 Azure AI Speech SDK 构建一个应用，需要将**英语语音**自动翻译为**法语、德语和西班牙语**。

**题目**

以下代码片段中，正确完成 `SpeechTranslationConfig` 配置的方式是什么？

**选项**

A.
```python
config.speech_recognition_language = "en-US"
config.add_target_language("fr-FR")
config.add_target_language("de-DE")
config.add_target_language("es-ES")
```

B.
```python
config.speech_recognition_language = "en-US"
config.add_target_language("fr")
config.add_target_language("de")
config.add_target_language("es")
```

C.
```python
config.source_language = "English"
config.target_languages = ["French", "German", "Spanish"]
```

D.
```python
config.speech_recognition_language = "en"
config.add_target_language("fr")
config.add_target_language("de")
config.add_target_language("es")
```

&nbsp;

---

**参考答案：B**

**解析：**

Speech Translation API 的语言代码规范：

- **`speech_recognition_language`（源语言）**：使用 BCP-47 格式，如 `"en-US"`（完整区域代码）
- **`add_target_language()`（目标语言）**：使用 ISO 639-1 两字母代码，如 `"fr"`、`"de"`、`"es"`（**不是**区域代码 `"fr-FR"`）

这是 Speech Translation 的特有规范，目标语言不包含地区后缀，与源语言的完整区域代码不同。

---

*第 201–270 题整理完毕，继续至 300 题。*

---

## 第 271 题

**背景**

你正在构建一个 Bot Framework 机器人，需要**从 Azure 门户获取连接到 Language 服务资源所需的信息**，包括端点 URL 和订阅密钥。

**题目**

应在 Azure 门户中哪个刀片（Blade）找到这些信息？

**选项**

A. Identity（标识）

B. Keys and Endpoint（密钥和终结点）

C. Properties（属性）

D. Networking（网络）

&nbsp;

---

**参考答案：B**

**解析：**

所有 Azure AI 服务资源的**端点 URL** 和**订阅密钥**（Key 1、Key 2）都存储在 **"Keys and Endpoint"** 刀片中：

- **Endpoint**：服务的 HTTPS 端点 URL
- **KEY 1 / KEY 2**：用于 API 身份验证的订阅密钥（两个密钥互为备份，便于密钥轮换）

这是所有 Azure AI 服务（Cognitive Services、OpenAI、Search 等）的标准位置，无论是 Language、Speech、Vision 还是其他服务。

---

## 第 272 题

**背景**

你正在使用 Azure AI 语言服务的**实体链接（Entity Linking）** API 分析文本：

> "Our tour guide took us up the Space Needle during our trip to Seattle last week."

**题目**

API 响应中将包含哪些信息？

**选项**

A. "Space Needle" 和 "Seattle" 的 Wikipedia URL，以及它们在文本中的位置（offset）和置信度

B. "tour guide"、"Space Needle" 和 "Seattle" 的实体类别分类

C. 整个句子的正面情感分数

D. "Space Needle" 和 "Seattle" 的 Wikipedia URL，但不包含位置信息

&nbsp;

---

**参考答案：A**

**解析：**

实体链接（Entity Linking）API 的响应包含：

```json
{
  "entities": [
    {
      "name": "Space Needle",
      "matches": [
        {"text": "Space Needle", "offset": 28, "length": 12, "confidenceScore": 0.97}
      ],
      "url": "https://en.wikipedia.org/wiki/Space_Needle",
      "dataSource": "Wikipedia"
    },
    {
      "name": "Seattle",
      "matches": [...],
      "url": "https://en.wikipedia.org/wiki/Seattle"
    }
  ]
}
```

每个实体包含：Wikipedia URL、文本中的位置（offset）、置信度分数 ✅

---

## 第 273 题

**背景**

你需要为 Azure AI Search 实现**文档级安全过滤**，确保用户只能看到他们有权限访问的文档（基于 Azure AD 组成员身份）。

**题目**

应在解决方案中包含哪三项操作？

**选项**（选三项）

A. 在每个搜索查询中发送 Azure AD 访问令牌

B. 检索所有组成员列表

C. 检索当前用户的组成员身份

D. 为每个文档添加允许访问的组 ID 字段

E. 为每个组创建独立的索引

F. 将组 ID 作为过滤条件附加到搜索查询

&nbsp;

---

**参考答案：C、D、F**

**解析：**

文档级安全过滤的实现模式：

1. **为文档添加组字段（D）**：在索引每个文档时，添加一个 `group_ids` 字段，记录哪些 Azure AD 组有权访问该文档（Filterable 属性）

2. **获取当前用户的组成员身份（C）**：在用户发起搜索时，通过 Microsoft Graph API 获取该用户所属的所有 Azure AD 组 ID 列表

3. **将组 ID 作为过滤条件（F）**：构建搜索查询时，附加 `$filter=group_ids/any(g:search.in(g, '{user-group-ids}'))` 过滤条件，只返回用户有权访问的文档

---

## 第 274 题

**背景**

你使用 Bot Framework SDK 构建了一个聊天机器人，需要用户在聊天时**提供凭据登录**（不使用公共登录）。

你需要在 Bot Framework Emulator 中测试该机器人，确保测试时会提示用户输入凭据。

**题目**

应在 Bot Framework Emulator 中配置哪三个设置？

**选项**（选三项）

A. 用于 Sign-in 的自定义登录 URL

B. Microsoft App ID

C. Microsoft App Password（应用密码）

D. 机器人本地端点 URL（如 http://localhost:3978/api/messages）

E. Bot 的 Azure 订阅 ID

&nbsp;

---

**参考答案：B、C、D**

**解析：**

在 Bot Framework Emulator 中测试需要身份验证的机器人，需要配置：

1. **Bot 端点 URL（D）**：本地运行的机器人端点（默认 `http://localhost:3978/api/messages`）
2. **Microsoft App ID（B）**：Azure AD 应用注册的 Application ID
3. **Microsoft App Password（C）**：对应的客户端密钥

这三个设置使 Emulator 能够模拟真实的身份验证流程，测试机器人的登录提示功能。

---

## 第 275 题

**背景**

你正在构建一个使用 Azure OpenAI 的聊天机器人应用。你需要确保每次部署后，应用能够自动识别 Azure OpenAI 资源的端点 URL。

**题目**

连接 Azure OpenAI 资源时，应用必须提供哪三个信息？

**选项**（选三项）

A. 端点 URL（Endpoint URL）

B. 部署名称（Deployment Name）

C. 模型名称（Model Name）

D. API 密钥（API Key）或 Entra ID 令牌

E. 订阅 ID（Subscription ID）

&nbsp;

---

**参考答案：A、B、D**

**解析：**

连接 Azure OpenAI 并调用特定部署的最小必要信息：

1. **端点 URL（A）**：资源的 HTTPS 端点，如 `https://your-resource.openai.azure.com/`
2. **部署名称（B）**：用于在 API 路径中指定使用哪个模型部署（如 `gpt-4-deployment`），Azure OpenAI REST API 使用部署名而非模型名
3. **API 密钥或令牌（D）**：身份验证凭据

注意：Azure OpenAI 不需要直接提供"模型名称"（C），而是提供"部署名称"（该部署绑定了某个模型）；订阅 ID（E）不是 API 调用的必要参数。

---

## 第 276 题

**背景**

你正在为一个社交媒体应用构建内容审核系统，需要实时处理用户上传的图像。

**题目**

以下关于 Azure AI Content Safety 图像分析的说法，哪两项正确？

**选项**（选两项）

A. 单次 API 调用可以同时检测 Hate、Violence、Sexual 和 SelfHarm 四个类别

B. 图像分析 API 仅支持 JPEG 格式，不支持 PNG

C. API 既支持图像 URL，也支持 Base64 编码的图像数据

D. Severity 分数范围是 0.0 到 1.0 的浮点数

E. 每个类别的 Severity 分数是 0 到 7 的整数

&nbsp;

---

**参考答案：A、C**（E 也可能正确，取决于 API 版本）

**解析：**

- **A（正确）**：通过在 `categories` 数组中同时指定多个类别，单次调用可检测所有四个类别 ✅
- **B（错误）**：支持多种格式，包括 JPEG、PNG、GIF、BMP 等
- **C（正确）**：`AnalyzeImage` 请求体支持 `url`（图像 URL）或 `data`（Base64 编码）两种输入方式 ✅
- **D（错误）**：Severity 分数是整数（0, 2, 4, 6），不是浮点数
- **E（部分正确）**：Severity 值实际上是 0、2、4、6 四个离散整数（或 0-7 根据 API 版本）

---

## 第 277 题

**背景**

你正在使用 Azure AI Speech 服务的 SSML（语音合成标记语言）为机动车辆应用生成语音导航。

**题目**

以下哪个 SSML 配置最适合优化车载环境中的语音音效？

**选项**

A. `<prosody rate="slow" pitch="-5%">Turn left in 500 meters.</prosody>`

B. `<mstts:express-as style="calm">Turn left in 500 meters.</mstts:express-as>`

C. `<voice name="en-US-JennyNeural" effect="eq_car">Turn left in 500 meters.</voice>`

D. `<emphasis level="strong">Turn left in 500 meters.</emphasis>`

&nbsp;

---

**参考答案：C**

**解析：**

`<voice effect="eq_car">` 是 Azure Speech SSML 中专门为**车载音响环境**优化的属性：

```xml
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis"
       xml:lang="en-US">
  <voice name="en-US-JennyNeural" effect="eq_car">
    Turn left in 500 meters.
  </voice>
</speak>
```

`eq_car` 效果应用了均衡器调整，使语音在车内嘈杂环境中听起来更清晰，是车载语音导航的标准配置。

其他选项（降速、平静风格、强调）影响的是语音表达方式，不是声学环境优化。

---

## 第 278 题

**背景**

你正在使用 Azure AI Foundry 构建一个利用 Azure AI Search 知识库的代理（Agent）。

代理的工具配置中包含 `AzureAISearchTool`，已连接到一个存储产品知识库的向量索引。

**题目**

`AzureAISearchTool` 的两个必填参数是什么？

**选项**（选两项）

A. 搜索服务的连接 ID（Connection ID）

B. 搜索索引的名称（Index Name）

C. 搜索服务的管理员密钥（Admin Key）

D. 向量字段名称（Vector Field Name）

E. 搜索服务的端点 URL

&nbsp;

---

**参考答案：A、B**

**解析：**

`AzureAISearchTool` 的最小必要配置（Python SDK）：

```python
from azure.ai.projects.models import AzureAISearchTool

search_tool = AzureAISearchTool(
    index_connection_id=connection.id,  # 必须：连接 ID
    index_name="product-knowledge-base"  # 必须：索引名称
)
```

- **连接 ID（A）**：通过 AI Foundry 项目中预先创建的 Azure AI Search 连接（Connection）提供，内含端点和认证信息
- **索引名称（B）**：指定要查询的具体索引

管理员密钥（C）通过连接对象提供，不直接传给工具；向量字段名称（D）和端点（E）包含在连接配置中，不是工具的独立参数。

---

## 第 279 题

**背景**

你有一个包含 5,000 张扫描发票图像的文件集合，需要提取发票中的关键信息（发票项目、销售金额、客户详情）。

**题目**

应使用哪个 Azure AI 服务？

**选项**

A. Custom Vision（自定义视觉）

B. Computer Vision（计算机视觉）

C. Immersive Reader（沉浸式阅读器）

D. Form Recognizer / Azure AI Document Intelligence（文档智能）

&nbsp;

---

**参考答案：D**

**解析：**

> ⚠️ **注意**：原题（241）答案为 C（Immersive Reader），但这明显是错误的——Immersive Reader 是为阅读障碍用户提供无障碍阅读体验的服务，完全不适合发票字段提取。

**正确答案是 D（Azure AI Document Intelligence）**，原因：
- **预构建发票模型（prebuilt-invoice）**：专门提取发票字段（行项目、总金额、供应商名称、客户信息等）
- **预构建收据模型（prebuilt-receipt）**：如果是收据而非发票，使用此模型
- 无需自定义训练，开发工作量最小

这是本题库中发现的原始题库明显错误，请以逻辑判断为准。

---

## 第 280 题

**背景**

你正在使用 Azure AI Language 服务构建一个分析文本的解决方案。你需要识别文本中提到的实体并**提供指向 Wikipedia 的参考链接**，以帮助用户深入了解相关概念。

**题目**

应使用哪个 Language API？

**选项**

A. 命名实体识别（Named Entity Recognition）

B. 实体链接（Entity Linking）

C. 关键短语提取（Key Phrase Extraction）

D. 语言检测（Language Detection）

&nbsp;

---

**参考答案：B**

**解析：**

**实体链接（Entity Linking）** 是专门将文本中的实体**链接到外部知识库**（如 Wikipedia）的功能：

- 识别实体（如 "Eiffel Tower"）
- 返回该实体的 Wikipedia URL（`https://en.wikipedia.org/wiki/Eiffel_Tower`）
- 返回 Bing 知识图谱 ID（`bingId`）

这正是"提供指向 Wikipedia 参考链接"的直接实现方式。

命名实体识别（A）只识别实体类型，不提供链接；关键短语提取（C）提取重要词组，不链接知识库。

---

## 第 281 题

**背景**

你正在使用 Microsoft Bot Framework SDK 构建一个聊天机器人，需要机器人**响应特定事件并发送自定义文本回复**。

**题目**

应使用什么来实现机器人对事件的响应？

**选项**

A. Adaptive Card（自适应卡片）

B. Activity Handler（活动处理器）

C. Dialog（对话）

D. Skill（技能）

&nbsp;

---

**参考答案：B**

**解析：**

**Activity Handler（活动处理器）** 是 Bot Framework SDK 中处理各种机器人活动（Activity）的核心机制：

```csharp
public class MyBot : ActivityHandler
{
    protected override async Task OnMessageActivityAsync(
        ITurnContext<IMessageActivity> turnContext,
        CancellationToken cancellationToken)
    {
        // 响应用户消息，发送自定义文本
        await turnContext.SendActivityAsync("Custom response text");
    }
    
    protected override async Task OnMembersAddedAsync(
        IList<ChannelAccount> membersAdded,
        ITurnContext<IConversationUpdateActivity> turnContext,
        CancellationToken cancellationToken)
    {
        // 响应成员加入事件
        await turnContext.SendActivityAsync("Welcome!");
    }
}
```

通过重写 Activity Handler 中的各个方法，可以响应不同类型的事件（消息、成员加入、成员离开等）并发送自定义文本回复。

---

## 第 282 题

**背景**

你有一个存储在本地驱动器的 **20 GB 视频文件（File1.avi）**，需要使用 **Azure AI Video Indexer 网站**对其建立索引。

**题目**

第一步应该做什么？

**选项**

A. 将 File1.avi 上传到 Azure Storage 队列

B. 将 File1.avi 上传到 www.youtube.com

C. 将 File1.avi 上传到 Microsoft OneDrive

D. 直接将 File1.avi 上传到 Azure AI Video Indexer 网站

&nbsp;

---

**参考答案：C 或 D**（存在版本差异）

**解析：**

> ⚠️ **争议说明**：
> - **原题 231** 答案为 D（OneDrive），理由是 Video Indexer 网站的文件大小限制为 2 GB，File1.avi（20 GB）超出限制，需要先上传到 OneDrive 生成共享链接再使用 URL 方式索引
> - **原题 375** 答案为 A（直接上传到 Video Indexer 网站），暗示可以直接上传
> - **原题 271** 答案为 D（从 OneDrive 创建下载链接）

实际规格：
- Video Indexer 网站直接上传限制：通常为 2 GB
- URL 方式上传限制：30 GB

对于 20 GB 文件：
- 应先上传到 OneDrive（或 Blob Storage），获取可公开访问的 URL
- 然后在 Video Indexer 中使用 URL 方式索引

**推荐答案：C（先上传到 OneDrive，然后使用链接）**，但不同版本的考题答案不一致，请以最新考试版本为准。

---

## 第 283 题

**背景**

你正在使用 Azure AI Agent Service 开发一个代理，该代理需要调用公司内部的订单状态查询 API。你已经用 Python 函数定义了该 API 的输入输出格式。

**题目**

在 Azure AI Foundry Agent Service 中，应通过哪种方式将自定义函数集成到代理中？

**选项**

A. 将函数打包为 Azure 函数应用并部署

B. 使用 `FunctionTool` 定义函数工具并添加到代理的工具列表

C. 将函数逻辑写入代理的系统消息中

D. 通过 `AzureAISearchTool` 将函数逻辑索引到搜索服务

&nbsp;

---

**参考答案：B**

**解析：**

Azure AI Agent Service 的函数工具（Function Tool）集成方式：

```python
def get_order_status(order_id: str) -> str:
    """查询订单状态"""
    # 调用内部 API
    return f"Order {order_id} status: Shipped"

# 创建函数工具
from azure.ai.projects.models import FunctionTool
functions = FunctionTool(functions=[get_order_status])

# 创建代理并注册工具
agent = project_client.agents.create_agent(
    model="gpt-4",
    tools=functions.definitions,
    tool_resources=functions.resources
)
```

代理在对话中自动判断何时调用该函数，并将结果整合到回答中。函数可以在本地运行，不需要部署为 Azure Function。

---

## 第 284 题

**背景**

你正在使用 Azure AI Document Intelligence 分析一个包含表格数据的 PDF 文档（test.pdf）。你需要使用 cURL 命令调用 API，并选择正确的**预构建模型**来提取表格。

**题目**

在 cURL 命令中：
- 应使用哪个认证头名称？
- 应使用哪个预构建模型 ID？

**选项**

A. 认证头：`Subscription-Key`；模型 ID：`prebuilt-layout`

B. 认证头：`Ocp-Apim-Subscription-Key`；模型 ID：`prebuilt-document`

C. 认证头：`Api-Key`；模型 ID：`prebuilt-read`

D. 认证头：`Ocp-Apim-Subscription-Key`；模型 ID：`prebuilt-layout`

&nbsp;

---

**参考答案：B**

**解析：**

- **认证头**：Azure Document Intelligence 使用 `Ocp-Apim-Subscription-Key` 作为订阅密钥头（与其他 Azure AI 服务一致）

- **模型 ID**：
  - `prebuilt-read`：仅提取文字和结构信息，对**表格支持有限**
  - `prebuilt-layout`：提取布局结构（文字、表格的位置信息），以 markdown 格式返回表格，但侧重于版式
  - **`prebuilt-document`**：提取文本、键值对、**表格结构和内容**（最适合含表格的 PDF），适合通用文档分析 ✅

---

## 第 285 题

**背景**

你正在构建一个 Azure OpenAI 应用，需要通过代码调用 Chat Completions API 并将结果输出到控制台。

**题目**

以下关于 Azure OpenAI SDK 调用的说法，哪项正确？

**选项**

A. `AzureOpenAI` 客户端需要 `endpoint`、`api_key` 和 `api_version` 三个参数

B. 调用 `chat.completions.create()` 时，只需提供 `model` 参数，不需要提供 `messages`

C. `chat.completions.create()` 返回的对象中，回复文本位于 `response.text` 属性

D. `model` 参数应设置为 Azure OpenAI 的全局模型名称（如 "gpt-4"），而非部署名称

&nbsp;

---

**参考答案：A**

**解析：**

Azure OpenAI Python SDK 的正确初始化：

```python
from openai import AzureOpenAI

client = AzureOpenAI(
    azure_endpoint="https://your-resource.openai.azure.com/",  # endpoint
    api_key="your-api-key",                                    # api_key
    api_version="2024-02-01"                                   # api_version（必须）
)

response = client.chat.completions.create(
    model="your-deployment-name",  # 部署名称（非模型名称）
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
    ]
)

# 正确获取回复文本
print(response.choices[0].message.content)  # 非 response.text
```

- B 错误：`messages` 是必填参数
- C 错误：回复在 `response.choices[0].message.content` 而非 `response.text`
- D 错误：`model` 参数应填**部署名称**（Deployment Name），不是全局模型名称

---

## 第 286 题

**背景**

你正在使用 Azure AI Language 服务对一批新闻文章进行处理，需要提取文章中提到的**关键公司名称**，以便后续业务分析。

**题目**

应使用哪个 Language API 功能？

**选项**

A. 关键短语提取（Key Phrase Extraction）

B. 情感分析（Sentiment Analysis）

C. 命名实体识别（NER）

D. 语言检测（Language Detection）

&nbsp;

---

**参考答案：C**

**解析：**

**命名实体识别（NER）** 可以从文本中提取特定类型的命名实体，包括 **Organization（组织）** 类别，正是用于识别公司名称：

```python
response = client.recognize_entities(
    documents=["Microsoft and OpenAI announced a new partnership."]
)
for entity in response[0].entities:
    if entity.category == "Organization":
        print(entity.text, entity.confidence_score)
# 输出: Microsoft 0.99, OpenAI 0.98
```

关键短语提取（A）提取重要词组，但不专门针对组织类实体；情感分析（B）分析情感倾向；语言检测（D）识别语言类型。

---

## 第 287 题

**背景**

你在构建一个使用 Semantic Kernel 的 AI 代理，需要代理能够访问**过去 90 天内发布的最新公开网络数据**（包括最新新闻和研究成果）。

**题目**

应在代理中配置哪种工具类型？

**选项**

A. `FileSearchTool`

B. `BingGroundingTool`

C. `CodeInterpreterTool`

D. `AzureAISearchTool`

&nbsp;

---

**参考答案：B**

**解析：**

**BingGroundingTool** 使代理能够通过 Bing Search API 访问**实时公开网络数据**，包括：
- 最新新闻（过去几天/几周内发布）
- 研究论文
- 公司公告
- 其他公开网络内容

这是获取模型训练数据截止日期之后发布信息的标准工具。配置时需要提供 Bing Search API 的连接凭据（通过 AI Foundry 连接管理）。

其他工具（FileSearch、CodeInterpreter、AzureAISearch）只能访问预先准备好的静态数据，无法获取实时网络内容。

---

## 第 288 题

**背景**

你正在使用 Azure AI Document Intelligence 构建一个分析医疗文档的应用（App1）。

你发送了一个分析请求并收到如下 JSON 响应片段：

```json
{
  "status": "succeeded",
  "analyzeResult": {
    "documents": [{
      "fields": {
        "PatientName": {
          "type": "string",
          "valueString": "John Doe",
          "confidence": 0.99
        }
      }
    }]
  }
}
```

**题目**

以下说法哪项正确？

**选项**

A. `confidence: 0.99` 表示字段识别的置信度为 99%

B. `"status": "succeeded"` 表示分析请求仍在进行中

C. `valueString` 字段包含的是字段在文档中的位置坐标

D. `confidence` 值为 1.0 时，字段识别100%准确，不会出错

&nbsp;

---

**参考答案：A**

**解析：**

- **A（正确）**：`confidence: 0.99` 表示该字段（PatientName）被正确识别的置信度为 99%（0 到 1 的浮点数，0.99 = 99%）✅

- **B（错误）**：`"status": "succeeded"` 明确表示分析**已成功完成**（区别于 "running" 表示进行中，"failed" 表示失败）

- **C（错误）**：`valueString` 包含的是识别到的**字段文本值**（"John Doe"），位置坐标信息存储在 `boundingRegions` 属性中

- **D（错误）**：置信度 1.0 是模型对结果的主观估计，实际上可能仍有极低概率错误（例如两个相似字符的混淆）

---

## 第 289 题

**背景**

你正在评估 Azure AI Agent Service 的能力，需要了解该服务支持哪种提示词模板格式，特别是能够处理**包含子属性的复杂对象**。

**题目**

以下哪两种提示词模板格式支持在模板中处理具有子属性的复杂对象？

**选项**

A. Liquid

B. JSONL

C. Handlebars

D. YAML

E. 基本字符串插值（Basic string interpolation）

&nbsp;

---

**参考答案：A、C**

**解析：**

在 Semantic Kernel 的提示词模板中，支持复杂对象子属性访问的格式：

**Liquid（A）**：
```liquid
Hello {{ user.profile.firstName }} {{ user.profile.lastName }}!
Your order #{{ order.id }} total is {{ order.items | sum: 'price' }}.
```

**Handlebars（C）**：
```handlebars
Hello {{user.profile.firstName}} {{user.profile.lastName}}!
{{#each order.items}}
  - {{name}}: ${{price}}
{{/each}}
```

两者都支持通过点号（`.`）访问对象的嵌套属性，以及循环、条件等逻辑，适合处理复杂数据结构。

JSONL（B）是数据格式，不是模板引擎；YAML（D）是配置格式，不支持模板逻辑。

---

## 第 290 题

**背景**

你正在使用 Azure AI Foundry 构建一个聊天机器人，已完成 Azure AI Search 知识库的配置。你需要在聊天代理中启用**自定义数据源**，使机器人能够基于公司内部文档回答问题。

**题目**

为了让 Azure OpenAI 聊天机器人使用 Azure AI Search 索引作为数据源，应在 API 请求中配置哪个额外参数？

**选项**

A. `context: {"index_name": "your-index"}`

B. `data_sources: [{"type": "azure_search", "parameters": {...}}]`

C. `system_message: "Use the provided knowledge base to answer questions."`

D. `tools: [{"type": "retrieval", "retrieval": {"index": "your-index"}}]`

&nbsp;

---

**参考答案：B**

**解析：**

Azure OpenAI "On Your Data" 功能通过 `data_sources` 参数（作为 `extra_body` 传递）实现：

```python
response = client.chat.completions.create(
    model="gpt-4-deployment",
    messages=messages,
    extra_body={
        "data_sources": [
            {
                "type": "azure_search",
                "parameters": {
                    "endpoint": "https://your-search.search.windows.net",
                    "index_name": "your-index-name",
                    "authentication": {
                        "type": "api_key",
                        "key": "your-search-api-key"
                    }
                }
            }
        ]
    }
)
```

该配置使 API 在生成回答前先查询 Azure Search 索引，实现 RAG（检索增强生成）模式。

---

## 第 291 题

**背景**

你正在使用 Azure OpenAI Studio 中的 Chat playground，需要构建一个聊天机器人，要求：

- 减少语言模型的运行成本
- 以简洁正式的商务语言回复
- 保持相同的聊天历史窗口大小

**题目**

应配置哪两项设置？

**选项**

A. 修改系统消息（System message），要求使用简洁正式的商务语言

B. 将最大响应 Token 数（Max response tokens）降低

C. 将 Temperature 参数调低至接近 0

D. 将所用模型切换为更小的版本

E. 增加 Top P 值至 1.0

&nbsp;

---

**参考答案：A、B**

**解析：**

- **系统消息（A）**：通过在系统消息中明确要求"简洁正式的商务语言"，直接控制机器人的输出风格，这是最直接有效的方式
- **降低最大响应 Token 数（B）**：简洁回复意味着更少 Token，降低 `max_tokens` 可以：
  1. 减少每次调用的 Token 消耗，**降低成本** ✅
  2. 不影响输入历史窗口大小（聊天历史由 `max_context_tokens` 控制，独立设置）✅

切换模型（D）也能降低成本，但题目未明确允许更换模型；Temperature（C）影响创造性，不直接控制简洁度。

---

## 第 292 题

**背景**

你正在使用 Azure AI Content Understanding 项目分析视频内容。你运行了自定义分析器（analyzer1），该分析器执行以下功能：
- 视频内容转录
- 从视频中提取关键帧

**题目**

以下关于该分析器运行结果的说法，哪项正确？

**选项**

A. 分析结果中不包含时间戳信息

B. 关键帧以 Base64 编码的图像数据形式返回

C. 分析结果包含转录文本和关键帧，并且每个关键帧都有对应的时间戳

D. 分析是同步的，运行后立即返回完整结果

&nbsp;

---

**参考答案：C**

**解析：**

Azure AI Content Understanding 视频分析的结果特征：

- **转录文本**：包含带时间戳的语音转文字内容
- **关键帧**：提取的代表性视频帧，每帧对应一个时间戳（`timestamp`）
- **异步处理**：视频分析是异步操作，需要轮询状态直到完成
- 关键帧通常以图像 URL 或 Base64 形式返回，具体取决于存储配置

分析是**异步**的（D 错误）；结果包含时间戳（A 错误）。

---

## 第 293 题

**背景**

你有一台本地计算机，包含以下文件：

- File1：WMV 格式视频
- File2：AVI 格式视频
- File3：MP4 格式视频
- File4：PDF 文件

**题目**

哪些文件可以上传并使用 Azure AI Video Indexer 进行分析？

**选项**

A. 仅 File1

B. 仅 File3

C. File1、File2 和 File3 仅

D. File1、File2、File3 和 File4 全部

E. File1、File2、File3（视频格式均支持）

&nbsp;

---

**参考答案：C 或 E**（视具体文件大小而定）

**解析：**

Azure AI Video Indexer 支持的**视频格式**：
- ✅ WMV（File1）
- ✅ AVI（File2）
- ✅ MP4（File3）
- ❌ PDF（File4）—— PDF 不是视频格式，不支持

文件大小限制（网站上传）：通常为 2 GB；URL 方式可达 30 GB。

假设文件大小均在限制范围内，File1、File2、File3 都可以上传，File4（PDF）不可以。

---

## 第 294 题

**背景**

你需要使用 Azure AI Content Safety 服务为一个聊天应用添加内容审核功能。你需要构建一个**检测用户消息中歧视性语言**的原型，且**最小化开发工作量**。

**题目**

应执行哪两项操作？

**选项**

A. 登录 Content Safety Studio，使用"Moderate text content"功能进行测试

B. 从 Azure 门户创建 Azure AI Content Safety 资源

C. 从 Azure 门户创建 Azure OpenAI 资源

D. 登录 Azure AI Foundry，在 Safety + Security 选项中配置

E. 部署 Azure AI Language 服务的自定义文本分类模型

&nbsp;

---

**参考答案：A、B**

**解析：**

构建歧视性语言检测原型的最快路径：

1. **创建 Content Safety 资源（B）**：在 Azure 门户创建资源，获取端点和密钥
2. **使用 Content Safety Studio（A）**：Content Safety Studio 是一个基于 Web 的界面，允许直接输入文本测试内容检测功能，实时查看 Hate、Violence、Sexual、Self-harm 各类别的检测结果，无需编写任何代码

这是最小化开发工作量的原型构建方式。OpenAI（C）和自定义分类模型（E）成本更高、配置更复杂。

---

## 第 295 题

**背景**

你正在构建一个使用 Azure AI 语言服务分析文档的应用。你需要处理**行业特定技术术语**，这些术语在标准 NER 实体类别中不存在。

**题目**

应使用哪个功能来识别这些行业特定术语？

**选项**

A. 关键短语提取（Key Phrase Extraction）

B. 自定义命名实体识别（Custom NER）

C. 对话语言理解（CLU）

D. 语言检测（Language Detection）

&nbsp;

---

**参考答案：B**

**解析：**

**自定义命名实体识别（Custom NER）** 允许：
1. 定义自定义实体类型（如"产品代号"、"技术规格型号"等）
2. 上传标注数据（在文本中标记出相应实体）
3. 训练针对特定领域的 NER 模型
4. 部署后用于识别文档中的行业专有术语

标准 NER 只能识别 Person、Location、Organization 等通用实体类别，无法识别公司特有的技术术语。Custom NER 是解决这类需求的专用功能。

---

## 第 296 题

**背景**

你正在使用 Azure AI Speech SDK 进行**实时语音翻译**，需要将英语语音翻译成多种语言（法语、德语、西班牙语）。

翻译结果处理逻辑使用以下事件：

```python
recognizer.recognized.connect(lambda evt: process_translation(evt.result))
```

**题目**

在 `process_translation` 函数中，应如何获取法语翻译结果？

**选项**

A. `result.text["fr"]`

B. `result.translations["fr"]`

C. `result.translations.fr`

D. `result.french_translation`

&nbsp;

---

**参考答案：B**

**解析：**

在 Speech Translation SDK 中，`TranslationRecognitionResult` 对象包含 `translations` 字典，键为语言代码，值为翻译文本：

```python
def process_translation(result):
    # 获取法语翻译
    french_text = result.translations["fr"]
    # 获取德语翻译
    german_text = result.translations["de"]
    # 获取西班牙语翻译
    spanish_text = result.translations["es"]
```

访问方式为 `result.translations["language_code"]`，语言代码使用 ISO 639-1 两字母格式（与 `AddTargetLanguage()` 时使用的格式一致）。

---

## 第 297 题

**背景**

你正在为一个 Azure AI Foundry 项目中的代理配置**函数调用（Function Calling）** 能力，代理将使用 Semantic Kernel 框架。

你需要确保：
- 所有与用户指令匹配的函数都被触发
- 如果函数需要必要参数而用户未提供，代理必须向用户询问

**题目**

在 Semantic Kernel 代码中，`FunctionChoiceBehavior` 应设置为哪个值来满足"所有匹配函数都被触发"的需求？

**选项**

A. `FunctionChoiceBehavior.None()`

B. `FunctionChoiceBehavior.Required()`

C. `FunctionChoiceBehavior.Auto()`

D. `FunctionChoiceBehavior.Manual()`

&nbsp;

---

**参考答案：C**

**解析：**

Semantic Kernel `FunctionChoiceBehavior` 选项：

| 选项 | 行为 |
|------|------|
| `None()` | 禁用函数调用 |
| **`Auto()`** | 让 LLM 自动判断何时调用函数，当指令与函数匹配时触发 ✅ |
| `Required()` | 强制每次响应都必须调用函数（即使不匹配） |

`Auto()` 是最自然的行为：模型智能地判断哪些函数与当前指令相关并触发它们，同时在函数参数不完整时自动请求用户补充信息。

---

## 第 298 题

**背景**

你正在构建一个 Azure OpenAI 应用，使用以下系统消息：

> "You are an AI assistant that helps people find information. Only answer questions that are directly related to the topic."

用户询问："What is the weather today?"（今天天气如何？）

该问题超出了系统消息定义的主题范围。

**题目**

为了确保机器人能够正确识别并拒绝超出范围的问题，应额外配置什么？

**选项**

A. 将 Temperature 设为 0

B. 启用 Azure AI Content Safety 的越狱风险检测

C. 在系统消息中明确说明超出范围时应如何回复（如"如果问题与主题无关，请回复'我只能回答关于[主题]的问题'"）

D. 使用 Azure AI Language 的意图分类预先过滤用户输入

&nbsp;

---

**参考答案：C**

**解析：**

处理超出范围问题最直接且开发工作量最小的方式是**在系统消息中明确定义边界回复**：

```
"You are an AI assistant that helps people find information about our products. 
If a user asks about anything unrelated to our products, politely respond: 
'I can only answer questions about our products. Please ask about product features, 
pricing, or availability.'"
```

这通过**提示词工程（Prompt Engineering）** 实现行为控制，无需额外的 AI 组件。

越狱检测（B）用于防止绕过安全限制的攻击，不适用于一般的范围控制；Temperature=0（A）影响随机性，不控制话题范围。

---

## 第 299 题

**背景**

你正在构建一个多步骤数据处理流水线，需要对 Azure OpenAI 生成的文本进行**实体提取**，然后对提取到的实体进行**情感分析**，最后将结果存储到数据库。

**题目**

为了实现最佳的 AI 功能组合，应使用哪两个 Azure AI 服务？

**选项**

A. Azure OpenAI（生成文本）+ Azure AI Language（实体提取 + 情感分析）

B. Azure OpenAI（所有任务）

C. Azure AI Language（所有任务，包括文本生成）

D. Azure AI Speech（语音转文字）+ Azure AI Language（后续处理）

&nbsp;

---

**参考答案：A**

**解析：**

最优服务组合：

1. **Azure OpenAI**：用于生成高质量的自然语言文本（GPT 系列模型的优势）
2. **Azure AI Language**：用于对生成的文本进行：
   - **命名实体识别（NER）**：提取实体
   - **情感分析（Sentiment Analysis）**：分析情感倾向

Azure AI Language 提供专门优化的 NER 和情感分析模型，比使用 OpenAI 通过提示词实现这些功能更准确、成本更低、响应更快。

两个服务的 API 都是 REST 接口，可以无缝串联在数据处理流水线中。

---

## 第 300 题

**背景**

你正在为一家国际公司的 Azure AI 解决方案进行最终审查。该解决方案使用 Azure OpenAI 为员工提供智能助手服务，通过情感分析结果来**影响员工的绩效考核**。

**题目**

为了确保该解决方案符合微软负责任 AI（Responsible AI）原则，应优先采取哪项措施？

**选项**

A. 在绩效评估决策中引入**人工审核步骤**，确保 AI 建议经过人类判断后才影响员工

B. 使用更大的模型以提高情感分析的准确性

C. 增加训练数据量以减少模型偏差

D. 将所有员工绩效数据公开，确保透明度

&nbsp;

---

**参考答案：A**

**解析：**

微软负责任 AI 原则中的**问责制（Accountability）** 原则明确要求：

> 当 AI 系统的决策可能对人类产生重大影响（如就业、财务状况等）时，必须保留**人工监督（Human oversight）** 机制，确保由负责任的人类做出最终决定。

"绩效考核"直接影响员工的职业发展和收入，属于高影响决策场景，不能完全自动化。AI（情感分析）只能作为**辅助工具**提供参考，最终决策必须由人类审核确认。

这同时也体现了**公平性**原则：情感分析模型可能存在偏差，人工审核可以纠正潜在的不公平判断。

---