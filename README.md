# Git 与 GitHub 手把手实战教程

## 这份文档适合谁

这份教程是给这样的人写的：

- 你已经用过 GitHub，但总觉得自己只是“会一点点”
- 你会 `git add`、`git commit`、`git push`，但一看到 `status`、分支、冲突、PR 就容易发懵
- 你不想只看概念，而是想通过做一个小项目，把 Git 和 GitHub 的关键操作真正串起来

这份教程的目标非常明确：

不是让你背 50 条命令，而是让你亲手做完一个小项目，在这个过程中理解 Git 和 GitHub 的核心用法。

你可以把它当成一个完整练习营。照着做完一遍，你对 Git 的理解会比现在清楚很多。

---

## 这份教程会带你完成什么

我们会从零开始做一个非常小的前端项目：`study-task-board`。

这是一个不用任何框架的静态小网页，功能很简单：

- 可以输入学习任务
- 点击按钮把任务加到列表里
- 显示任务总数

项目本身不重要，它只是一个练习载体。真正重要的是，我们会在这个项目里练这些 Git 和 GitHub 操作：

- `git init`
- `git status`
- `git add`
- `git commit`
- `git diff`
- `git log`
- `.gitignore`
- `git restore`
- `git branch`
- `git switch`
- `git merge`
- 处理冲突
- `git remote add`
- `git push`
- `git pull --rebase`
- GitHub 新建仓库
- GitHub Pull Request
- GitHub Issue
- `git stash`
- `git revert`
- `git tag`

你不需要一次全部记住。你只需要边做边理解。

---

## 你会得到什么能力

做完这份教程后，你应该能达到下面这个水平：

- 看到 `git status` 基本知道它在说什么
- 知道什么是工作区、暂存区、本地提交、远程仓库
- 会从零创建一个项目并纳入 Git 管理
- 会把改动拆成合理的提交
- 会在功能分支上开发，而不是一直在 `main` 上乱改
- 会把本地仓库连到 GitHub
- 会推送代码、发 PR、合并 PR
- 发生冲突时，知道怎么判断和处理
- 出现误提交时，知道 `restore`、`stash`、`revert` 是干什么的

如果这些你都能走通，说明你已经从“会一点基本操作”开始真正往“会用 Git 和 GitHub”走了。

---

## 使用建议

这份教程最好的使用方法不是“看完”，而是“边看边敲”。

推荐你这样做：

1. 新开一个终端窗口
2. 选一个空目录作为练习区
3. 每一节都照着做
4. 每执行 1 到 2 条命令，就看一次 `git status`
5. 每次有点晕时，先停下来，不要硬往下冲

记住一句话：

Git 最怕的不是不会，而是没看清状态就乱操作。

---

## 第一部分：先把脑子里的地图搭起来

在真正开始做项目之前，你需要先理解 Git 到底在管理什么。

## 1. Git 和 GitHub 不是一回事

- `Git`：版本管理工具，主要跑在你本地电脑上
- `GitHub`：托管 Git 仓库并提供协作功能的平台

你可以这样理解：

- Git 负责保存历史、切分支、合并代码
- GitHub 负责远程仓库、代码托管、PR、Review、Issue、Actions

一句话版本：

Git 是底层机制，GitHub 是围绕它做协作的地方。

## 2. Git 最核心的 4 个区域

### 工作区 `working directory`

你正在编辑的真实文件。

### 暂存区 `staging area`

你准备放进下一次提交的内容。

### 本地仓库 `local repository`

你已经提交下来的历史记录。

### 远程仓库 `remote repository`

GitHub 上那份仓库。

## 3. 你之后所有操作都可以套进这条线里

```text
修改文件
-> git add
-> git commit
-> git push
```

这几个动作分别是什么意思：

- `git add`：把改动放进暂存区
- `git commit`：把暂存区内容保存为本地历史快照
- `git push`：把本地提交推到 GitHub

所以：

- `commit` 不是上传
- `push` 才是上传到远程

很多人卡住，就是因为没把这三个动作分清楚。

---

## 第二部分：准备环境

这一节我们不做复杂配置，只做练习需要的最低准备。

## 1. 检查 Git 是否安装

在终端执行：

```bash
git --version
```

如果看到类似：

```text
git version 2.x.x
```

就说明 Git 已经装好了。

## 2. 配置你的用户名和邮箱

如果你还没配置过，执行：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

为什么要配？

因为 Git 需要知道每次提交是谁做的。

你可以检查一下：

```bash
git config --global --list
```

## 3. 让 Git 正常显示中文文件名

你刚才已经遇到过中文文件名显示成转义字符的问题。可以提前设置：

```bash
git config --global core.quotepath false
```

之后 `git status` 显示中文会更友好。

## 4. 建议设置默认主分支名为 `main`

```bash
git config --global init.defaultBranch main
```

这样以后新仓库默认就是 `main` 分支。

---

## 第三部分：创建练习项目

从这里开始，我们正式动手。

## 1. 先选一个练习目录

建议你不要直接在现在的学习文档目录里做项目，而是新开一个练习区。

比如：

```bash
mkdir -p ~/Desktop/workspace/git-github-lab
cd ~/Desktop/workspace/git-github-lab
```

## 2. 创建项目文件夹

```bash
mkdir study-task-board
cd study-task-board
```

现在你可以执行：

```bash
pwd
```

你应该能看到类似：

```text
/Users/你的用户名/Desktop/workspace/git-github-lab/study-task-board
```

## 3. 初始化 Git 仓库

```bash
git init
```

如果你想保险一点，可以再执行：

```bash
git branch -M main
```

这一步的意思是：

- 创建一个 Git 仓库
- 当前目录开始被 Git 管理

## 4. 第一次看 `git status`

执行：

```bash
git status
```

你大概率会看到类似：

```text
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

它的意思是：

- `On branch main`：当前在 `main` 分支
- `No commits yet`：还没有任何提交
- `nothing to commit`：目前没有文件可提交

这说明仓库已经创建成功。

---

## 第四部分：创建项目文件并做第一次提交

我们先创建最基础的项目结构。

## 1. 项目目录结构

做完这一节后，你的目录会长这样：

```text
study-task-board/
  README.md
  index.html
  style.css
  app.js
  .gitignore
```

## 2. 创建 `README.md`

你可以用任何编辑器创建 `README.md`，内容先写这版：

```md
# Study Task Board

A tiny practice project for learning Git and GitHub.

## Features

- Add a study task
- Show task count
- Practice version control workflow
```

## 3. 创建 `index.html`

内容如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Study Task Board</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <main class="app">
      <h1>Study Task Board</h1>
      <p class="subtitle">Track what you want to study today.</p>

      <section class="panel">
        <input id="taskInput" type="text" placeholder="Enter a study task" />
        <button id="addButton">Add Task</button>
      </section>

      <p id="summary">Total tasks: 0</p>

      <ul id="taskList"></ul>
    </main>

    <script src="./app.js"></script>
  </body>
</html>
```

## 4. 创建 `style.css`

内容如下：

```css
body {
  margin: 0;
  font-family: sans-serif;
  background: #f5f7fb;
  color: #1f2937;
}

.app {
  max-width: 720px;
  margin: 40px auto;
  padding: 24px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
}

.subtitle {
  color: #4b5563;
}

.panel {
  display: flex;
  gap: 12px;
  margin: 20px 0;
}

input {
  flex: 1;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
}

button {
  padding: 12px 18px;
  border: none;
  border-radius: 10px;
  background: #2563eb;
  color: #ffffff;
  cursor: pointer;
}

ul {
  padding-left: 20px;
}
```

## 5. 创建 `app.js`

内容如下：

```js
const taskInput = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");
const summary = document.querySelector("#summary");

const tasks = [];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.textContent = task;
    taskList.appendChild(item);
  });

  summary.textContent = `Total tasks: ${tasks.length}`;
}

addButton.addEventListener("click", () => {
  const value = taskInput.value.trim();

  if (!value) {
    return;
  }

  tasks.push(value);
  taskInput.value = "";
  renderTasks();
});
```

## 6. 创建 `.gitignore`

内容如下：

```gitignore
.DS_Store
node_modules/
dist/
```

为什么要有 `.gitignore`？

因为有些文件不适合纳入版本管理，比如系统垃圾文件、依赖目录、构建产物。

虽然这个项目现在没有 `node_modules`，但你先养成习惯是好的。

## 7. 看第一次状态

执行：

```bash
git status
```

你会看到类似：

```text
Untracked files:
  .gitignore
  README.md
  app.js
  index.html
  style.css
```

## 8. `Untracked files` 是什么意思

意思是：

- 这些文件现在存在于目录里
- Git 看见它们了
- 但你还没有让 Git 正式跟踪它们

这就是你之前在 `studyIwant` 目录里看到的状态。

## 9. 把文件加入暂存区

执行：

```bash
git add .
```

然后立刻再看：

```bash
git status
```

这时你大概率会看到：

```text
Changes to be committed:
  new file:   .gitignore
  new file:   README.md
  new file:   app.js
  new file:   index.html
  new file:   style.css
```

## 10. `Changes to be committed` 是什么意思

意思是：

- 这些内容已经进入暂存区
- 只要你现在执行 `git commit`
- 它们就会进入仓库历史

## 11. 做第一次提交

执行：

```bash
git commit -m "init: create study task board"
```

再看：

```bash
git status
```

你应该会看到类似：

```text
On branch main
nothing to commit, working tree clean
```

这句非常重要：

`working tree clean`

意思是：

- 当前工作区没有未处理改动
- 暂存区也没有待提交内容
- 你现在是“干净状态”

## 12. 看第一条历史记录

执行：

```bash
git log --oneline --graph --decorate
```

你会看到一条提交记录。现在你已经完成了一个从零开始的 Git 项目最基本的闭环：

```text
创建文件 -> add -> commit -> 查看历史
```

---

## 第五部分：学会看懂 `git status`

这一节非常关键。你以后大多数问题，都可以靠 `git status` 先搞清楚。

## 1. `git status` 常见状态一览

### `Untracked files`

文件还没被 Git 跟踪。

### `Changes not staged for commit`

文件改了，但还没 `git add`。

### `Changes to be committed`

已经 `git add`，准备提交。

### `nothing to commit, working tree clean`

仓库当前很干净，没有待处理改动。

### `Your branch is ahead of 'origin/main' by 1 commit`

你本地比 GitHub 远程多了 1 个提交，还没 push。

### `Your branch is behind 'origin/main' by 1 commit`

GitHub 远程比你本地多了 1 个提交，你要先 pull。

## 2. 最简单的判断模板

以后只要看到 `git status`，你就问自己这 4 个问题：

1. 我现在在哪个分支？
2. 有没有未跟踪文件？
3. 有没有修改但没 add？
4. 有没有 add 了但还没 commit？

只要这四个问题你都能回答，局面通常就不会乱。

---

## 第六部分：练 `git diff`，学会看自己改了什么

现在我们故意修改一个文件，看看 Git 怎么显示变化。

## 1. 修改 `README.md`

把 `README.md` 最后加一行：

```md
- Built with plain HTML, CSS, and JavaScript
```

## 2. 看状态

```bash
git status
```

你会看到：

```text
Changes not staged for commit:
  modified:   README.md
```

## 3. 看差异

```bash
git diff
```

Git 会告诉你这一行是怎么加进去的。

你要理解：

- `git status` 告诉你“哪些文件变了”
- `git diff` 告诉你“具体变了什么”

## 4. 暂存这个文件

```bash
git add README.md
```

然后看：

```bash
git status
```

这时它会进入：

```text
Changes to be committed
```

## 5. 再看一次差异

```bash
git diff
```

你会发现可能没东西了，或者输出和刚才不一样。

这是因为：

- 现在工作区和暂存区已经一致

如果你想看“已经 add 的内容”，要用：

```bash
git diff --staged
```

## 6. 提交这次文档改动

```bash
git commit -m "docs: update README features"
```

---

## 第七部分：练“只提交一部分改动”

真正工作里，你经常会同时改了多个文件，但不想一股脑全提交。

这一节会帮你建立这个习惯。

## 1. 同时修改两个文件

先改 `README.md`，加入一行：

```md
- Tasks can be added in the browser
```

再改 `app.js`，把输入为空时的处理改一下：

把这段：

```js
if (!value) {
  return;
}
```

改成：

```js
if (!value) {
  alert("Please enter a task.");
  return;
}
```

## 2. 看状态

```bash
git status
```

你会看到两个文件都被修改了。

## 3. 现在我们只想提交文档，不提交功能

执行：

```bash
git add README.md
git status
```

此时你会看到：

- `README.md` 在 `Changes to be committed`
- `app.js` 在 `Changes not staged for commit`

这就是 Git 很强的一点：

你可以把一堆改动拆开提交。

## 4. 提交文档

```bash
git commit -m "docs: add usage details to README"
```

## 5. 再看状态

```bash
git status
```

你会发现 `app.js` 的改动还在，但 README 已经提交完了。

## 6. 再提交功能

```bash
git add app.js
git commit -m "feat: show alert when input is empty"
```

这个练习很重要，因为它会让你明白：

提交是可以精细组织的，不是每次都只能 `git add .`。

---

## 第八部分：练撤销，理解 `git restore`

很多人怕 Git，是因为觉得“一改错就没救”。我们先练最安全的撤销方式。

## 1. 故意改错一个文件

打开 `style.css`，故意把按钮颜色改成一个你不想要的颜色，比如：

```css
background: hotpink;
```

## 2. 看差异

```bash
git diff
```

## 3. 我现在不想要这次改动了

执行：

```bash
git restore style.css
```

再看：

```bash
git status
```

它应该恢复成干净状态。

## 4. `git restore` 是干什么的

最简单理解：

- 我改了文件
- 但还没提交
- 我想把它恢复回上一次提交状态

那就可以用 `git restore <file>`

## 5. 如果文件已经 add 了怎么办

比如你先这样做：

```bash
echo "" >> README.md
git add README.md
git status
```

现在 README 已经在暂存区了。

如果你想取消暂存，可以执行：

```bash
git restore --staged README.md
```

这一步只会把它从暂存区拿出来，不会删掉工作区里的修改。

如果你还想连修改一起扔掉，再执行：

```bash
git restore README.md
```

这两个动作你要分清：

- `git restore --staged`：取消暂存
- `git restore`：恢复文件内容

---

## 第九部分：开始学分支

到这里，你已经会基础提交了。接下来要进入真正开发流程。

## 1. 分支到底是什么

你可以把分支理解成：

“从某个提交点开始，单独拉出来的一条开发线。”

为什么要用分支？

- 避免直接把主分支改乱
- 每个功能单独开发
- 更适合 review 和 PR
- 出问题时更容易回滚

## 2. 查看分支

```bash
git branch
```

当前你大概率只会看到：

```text
* main
```

带 `*` 的就是当前分支。

## 3. 创建并切换到新分支

我们现在要做一个新功能：支持按回车添加任务。

执行：

```bash
git switch -c feature/enter-key
```

这条命令的意思是：

- 创建一个新分支 `feature/enter-key`
- 立即切换过去

再看：

```bash
git branch
```

你应该会看到当前在新分支上。

## 4. 在新分支上开发功能

修改 `app.js`，在文件末尾加上下面这段：

```js
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addButton.click();
  }
});
```

## 5. 提交这个功能

```bash
git add app.js
git commit -m "feat: support Enter key to add tasks"
```

## 6. 看历史

```bash
git log --oneline --graph --decorate
```

现在你是在 `feature/enter-key` 上，这个分支比 `main` 多了一个提交。

---

## 第十部分：合并分支

## 1. 切回主分支

```bash
git switch main
```

## 2. 合并功能分支

```bash
git merge feature/enter-key
```

如果没有冲突，Git 会自动合并。

## 3. 再看历史

```bash
git log --oneline --graph --decorate
```

如果这个分支只是线性前进，Git 可能直接“快进合并”。

## 4. 删除已经完成的本地分支

```bash
git branch -d feature/enter-key
```

这一步不是必须，但非常推荐养成习惯。

为什么？

因为分支太多会越来越乱。做完一个功能，合并后就可以清理。

---

## 第十一部分：手动制造一次冲突并解决

冲突是你必须亲手练的部分。不要只看。

## 目标

我们故意让两个分支改同一行，然后学会解决。

## 1. 确认当前在 `main`

```bash
git switch main
```

## 2. 创建分支 A

```bash
git switch -c feature/blue-subtitle
```

修改 `index.html` 里的这行：

```html
<p class="subtitle">Track what you want to study today.</p>
```

把它改成：

```html
<p class="subtitle">Track what you want to study this morning.</p>
```

提交：

```bash
git add index.html
git commit -m "feat: update subtitle for morning plan"
```

## 3. 回到主分支，再创建分支 B

```bash
git switch main
git switch -c feature/night-subtitle
```

把同一行改成：

```html
<p class="subtitle">Track what you want to study tonight.</p>
```

提交：

```bash
git add index.html
git commit -m "feat: update subtitle for night plan"
```

## 4. 现在尝试合并分支 A

你当前在 `feature/night-subtitle` 上，执行：

```bash
git merge feature/blue-subtitle
```

这时大概率会冲突。

## 5. 先看状态

```bash
git status
```

你可能会看到：

```text
both modified: index.html
```

这句话的意思是：

- 两边都改了同一个文件
- Git 无法自动决定保留哪个版本

## 6. 打开 `index.html` 看冲突标记

你会看到类似：

```html
<<<<<<< HEAD
<p class="subtitle">Track what you want to study tonight.</p>
=======
<p class="subtitle">Track what you want to study this morning.</p>
>>>>>>> feature/blue-subtitle
```

解释一下：

- `HEAD` 这部分是你当前分支的版本
- 下面那部分是要合并进来的分支版本

## 7. 手动解决

假设你决定最后保留一个更通用的句子：

```html
<p class="subtitle">Track what you want to study today.</p>
```

那你就把那整块冲突内容改成这 1 行，并删掉冲突标记。

## 8. 标记为已解决并提交

```bash
git add index.html
git commit -m "merge: resolve subtitle conflict"
```

## 9. 这次练习你要学到什么

- 冲突不是仓库坏了
- 冲突只是 Git 让你做决定
- 解决冲突后一定要 `git add`
- merge 冲突处理完后通常是 `git commit`

## 10. 清理分支

```bash
git switch main
git merge feature/night-subtitle
git branch -d feature/blue-subtitle
git branch -d feature/night-subtitle
```

如果你觉得这几步有点绕，也没关系。最重要的是你已经亲手见过一次冲突。

---

## 第十二部分：把项目连到 GitHub

到这里为止，你学的是纯本地 Git。现在开始接入 GitHub。

## 1. 在 GitHub 上创建一个空仓库

打开 GitHub 网站，创建一个新仓库，建议命名为：

```text
study-task-board
```

创建时建议注意这几点：

- 仓库可以设为 `public` 或 `private`，都行
- 因为我们本地已经有 README 和历史了，所以不要勾选“初始化 README”
- 不要让 GitHub 自动帮你加 `.gitignore`

为什么？

因为我们本地已经是完整仓库了。如果远程也提前初始化，就会多一段独立历史，初学阶段容易增加理解负担。

## 2. 这一节为什么推荐你优先用 SSH

你在实际练习里很可能会碰到这种错误：

```text
remote: Invalid username or token. Password authentication is not supported for Git operations.
fatal: Authentication failed
```

这句话的意思不是“仓库地址错了”，而是：

- 你已经连到了 GitHub
- 但认证方式不对
- GitHub 不支持再用账号密码做 Git 的 HTTPS 推送

所以这份教程从这里开始，默认带你走 SSH 方案。

SSH 的好处是：

- 配好之后推送和拉取更顺手
- 不用每次输入 GitHub 账号密码
- 更适合长期使用

## 3. 先检查你本机有没有现成的 SSH key

执行：

```bash
ls -la ~/.ssh
```

如果你看到类似这些文件：

```text
id_ed25519
id_ed25519.pub
```

说明你本机已经有一把 SSH key，可以优先复用。

如果你没看到这些文件，也没关系，就进入下一步自己生成。

## 4. 如果还没有 SSH key，就生成一把

执行：

```bash
ssh-keygen -t ed25519 -C "你的邮箱"
```

一路按回车即可。默认会生成：

```text
~/.ssh/id_ed25519
~/.ssh/id_ed25519.pub
```

说明：

- 私钥是 `id_ed25519`，不要发给别人
- 公钥是 `id_ed25519.pub`，这个可以加到 GitHub

如果你本来就已经有 `id_ed25519` 和 `id_ed25519.pub`，这一节就不用重复生成。

## 5. 把公钥复制出来

执行：

```bash
cat ~/.ssh/id_ed25519.pub
```

你会看到一整行以 `ssh-ed25519` 开头的文本。

把这一整行完整复制下来。

如果你在 macOS 上想直接复制到剪贴板，可以用：

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

## 6. 把公钥加到 GitHub 账号

打开 GitHub 的 SSH key 设置页：

```text
https://github.com/settings/keys
```

然后：

1. 点击 `New SSH key`
2. `Key type` 选 `Authentication Key`
3. `Title` 可以写 `cjw-mac` 或你能认出的设备名
4. 把刚才复制的整行公钥粘贴进去
5. 点击 `Add SSH key`

这一步的意思是：

告诉 GitHub，这台电脑以后可以用对应的私钥来证明“我是你”。

## 7. 让 macOS 记住这把 key

先创建 SSH 配置文件：

```bash
touch ~/.ssh/config
chmod 600 ~/.ssh/config
```

然后编辑它：

```bash
open -e ~/.ssh/config
```

写入下面这些内容：

```sshconfig
Host github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519
```

保存以后，在终端执行：

```bash
eval "$(ssh-agent -s)"
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

如果你给 SSH key 设置过 passphrase，这里会让你输入一次。输入时终端不显示字符，是正常现象。

## 8. 测试 SSH 到 GitHub 是否打通

执行：

```bash
ssh -T git@github.com
```

第一次连接时，你可能会看到“是否信任 github.com”之类的提示。

如果你看到类似下面这种内容：

```text
The authenticity of host 'github.com (...)' can't be established.
ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
Are you sure you want to continue connecting (yes/no)?
```

输入：

```text
yes
```

如果一切正常，你会看到类似：

```text
Hi 你的用户名! You've successfully authenticated, but GitHub does not provide shell access.
```

这不是报错，而是成功提示。它的意思是：

- GitHub 已经认出你了
- SSH 登录验证成功
- 只是 GitHub 不提供真正的 shell 终端

如果你看到的是：

```text
Permission denied (publickey)
```

通常表示：

- 公钥还没有加到 GitHub
- 或者这把 key 还没有加入 `ssh-agent`

如果你看到的是：

```text
Host key verification failed
```

通常表示这是你第一次连 `github.com`，但还没有完成主机指纹确认，重新执行 `ssh -T git@github.com`，并在提示时输入 `yes` 即可。

## 9. 复制 SSH 仓库地址

创建完 GitHub 仓库后，复制它的 SSH 地址。

格式长这样：

```text
git@github.com:你的用户名/study-task-board.git
```

例如：

```text
git@github.com:CJWchen/study-task-board.git
```

## 10. 在本地添加远程仓库

如果你之前还没有添加过 `origin`，执行：

```bash
git remote add origin git@github.com:你的用户名/study-task-board.git
```

例如：

```bash
git remote add origin git@github.com:CJWchen/study-task-board.git
```

## 11. 如果你之前已经用 HTTPS 添加过 `origin`

如果你之前执行过：

```bash
git remote add origin https://github.com/你的用户名/study-task-board.git
```

那就不要重复 `add`，而是改地址：

```bash
git remote set-url origin git@github.com:你的用户名/study-task-board.git
```

例如：

```bash
git remote set-url origin git@github.com:CJWchen/study-task-board.git
```

这一步特别重要，因为很多人 SSH 明明已经配好了，但仓库远程地址还停留在 `https`，结果推送时还是会走回旧的认证方式。

## 12. 检查远程配置

执行：

```bash
git remote -v
```

你应该看到类似：

```text
origin  git@github.com:your-name/study-task-board.git (fetch)
origin  git@github.com:your-name/study-task-board.git (push)
```

如果这里还显示 `https://github.com/...`，说明你还没有切换成功。

## 13. 第一次推送到 GitHub

执行：

```bash
git push -u origin main
```

这条命令里的 `-u` 很重要，它会建立本地 `main` 和远程 `origin/main` 的跟踪关系。

以后你再推送时，很多时候就只需要：

```bash
git push
```

## 14. 推送后怎么看状态

再执行：

```bash
git status
```

你应该会看到工作区干净，而且本地和远程已经关联起来了。

如果你推送成功了，但忘了自己到底连的是不是 SSH，也可以随时再检查一次：

```bash
git remote -v
```

---

## 第十三部分：练一次真正的 GitHub 工作流

这一节非常关键。很多人会本地 Git，但不会 GitHub 协作。

我们现在走一次标准工作流：

```text
main 拉最新
-> 建功能分支
-> 开发
-> commit
-> push 分支
-> GitHub 开 PR
-> 合并
```

## 1. 先确保主分支是最新

```bash
git switch main
git pull --rebase
```

## 2. 创建新功能分支

这次我们做一个新功能：页面加载时自动聚焦输入框。

```bash
git switch -c feature/auto-focus
```

## 3. 修改 `app.js`

在文件最下面加一行：

```js
taskInput.focus();
```

## 4. 提交改动

```bash
git add app.js
git commit -m "feat: focus input on page load"
```

## 5. 推送这个分支到 GitHub

```bash
git push -u origin feature/auto-focus
```

## 6. 去 GitHub 开 PR

打开 GitHub 仓库页面，通常会看到一个创建 Pull Request 的提示。

如果没有提示，也可以：

- 进入仓库页面
- 找到 Pull requests
- 点击 New pull request
- 选择 base 为 `main`
- 选择 compare 为 `feature/auto-focus`

## 7. PR 标题可以这样写

```text
feat: focus input on page load
```

## 8. PR 描述可以这样写

```md
## Summary

- focus the task input when the page loads

## Testing

- open the page
- check whether the cursor is already in the input
```

## 9. 为什么 PR 很重要

PR 的作用不是“多此一举”，而是：

- 把一组改动组织成一个可审阅单元
- 让别人能集中看这次改了什么
- 能关联讨论、Review、CI
- 留下清晰的协作记录

即使你现在是自己练，也建议你走一遍 PR 流程。

## 10. 合并 PR

PR 页面一般会提供几种合并方式：

- Create a merge commit
- Squash and merge
- Rebase and merge

初学阶段你可以优先用：

```text
Squash and merge
```

因为它可以把一个功能分支上的多个碎提交压成一个更干净的提交。

## 11. 合并后，本地同步主分支

回到终端：

```bash
git switch main
git pull --rebase
```

## 12. 删除本地分支

```bash
git branch -d feature/auto-focus
```

如果 GitHub 上也提示删除远程分支，你可以顺手删掉。

---

## 第十四部分：练一次“远程改了，本地怎么同步”

这一节是为了让你理解 `pull` 真正在做什么。

## 1. 在 GitHub 网页上直接改 README

到你的 GitHub 仓库页面：

- 打开 `README.md`
- 点击编辑
- 加一行：

```md
- Synced from a GitHub web edit
```

- 直接在 GitHub 上提交

## 2. 回到本地看状态

此时你本地还不知道远程有变化。

执行：

```bash
git status
```

有时它不一定立刻提示 behind，因为本地还没 fetch 到最新远程信息。

## 3. 拉取远程更新

```bash
git pull --rebase
```

这一步做了什么？

- 把 GitHub 上的新提交拉下来
- 尝试把你本地当前分支更新到那个状态

## 4. 再看历史

```bash
git log --oneline --graph --decorate
```

你会看到新的提交历史。

---

## 第十五部分：练一次 `stash`

`stash` 是“我做了一半，但现在不想提交，也不想丢”的工具。

## 1. 故意做一半改动

修改 `style.css`，比如把背景颜色和标题样式改一下，但先不要提交。

## 2. 看状态

```bash
git status
```

## 3. 现在你突然想切分支，不想带着这堆未完成改动

执行：

```bash
git stash
```

再看：

```bash
git status
```

工作区应该会变干净。

## 4. 把改动取回来

```bash
git stash pop
```

你刚才的改动会重新回到工作区。

## 5. `stash` 的典型场景

- 改到一半
- 突然要去修别的分支
- 现在提交又太早
- 那就先 `stash`

---

## 第十六部分：学会安全回滚，理解 `revert`

`revert` 非常重要，尤其是已经 push 到远程的提交。

## 1. 先做一个“错误提交”

比如修改 `README.md`，加一行你其实不想保留的内容：

```md
- This line will be reverted
```

然后提交：

```bash
git add README.md
git commit -m "docs: add temporary line"
```

## 2. 如果你已经提交了，但决定撤回这个提交

执行：

```bash
git revert HEAD
```

Git 会创建一个新的“反向提交”。

## 3. 为什么推荐 `revert`

因为它不会粗暴抹掉历史，而是：

- 保留原提交
- 再新增一个撤销它的提交

这对已经共享到远程的历史更安全。

## 4. 看历史

```bash
git log --oneline --graph --decorate
```

你会看到：

- 一个你刚才做的错误提交
- 一个新的 revert 提交

---

## 第十七部分：理解 `reset`，但先不要乱用

这一节只让你理解它的作用，不要求你立刻熟练使用。

## 1. `reset` 和 `revert` 不是一回事

- `revert`：新增一个反向提交，适合公共历史
- `reset`：把分支指针往回挪，适合本地整理历史

## 2. 最安全的入门练法：`--soft`

你可以先做一个练习提交：

```bash
echo "" >> README.md
git add README.md
git commit -m "docs: practice reset"
```

然后执行：

```bash
git reset --soft HEAD~1
```

这意味着：

- 最后一个提交被撤回了
- 但改动还留在暂存区

再看：

```bash
git status
```

你会发现内容还在。

## 3. 现在先别碰 `git reset --hard`

记住一句话：

`git reset --hard` 很危险，新手不要随便用。

---

## 第十八部分：练 GitHub Issue

GitHub 不只是放代码，它也是项目协作平台。

Issue 是最基础的协作对象之一。

## 1. 在 GitHub 上创建一个 Issue

比如新建一个 Issue，标题写：

```text
Support removing tasks from the list
```

正文可以写：

```md
Add a delete button for each task so users can remove finished items.
```

## 2. 为什么要练 Issue

因为真实团队里，很多需求、bug、讨论，都会先从 Issue 开始。

## 3. 你可以把功能分支和 Issue 关联起来

比如创建一个分支：

```bash
git switch main
git pull --rebase
git switch -c feature/delete-task
```

然后你去实现删除按钮功能。

## 4. 一个简单实现示例

你可以把 `app.js` 改成下面这个版本，用对象存储任务，并给每个任务加删除按钮。

```js
const taskInput = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");
const summary = document.querySelector("#summary");

const tasks = [];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const item = document.createElement("li");
    const label = document.createElement("span");
    const removeButton = document.createElement("button");

    label.textContent = task;
    removeButton.textContent = "Delete";

    removeButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    item.appendChild(label);
    item.appendChild(removeButton);
    taskList.appendChild(item);
  });

  summary.textContent = `Total tasks: ${tasks.length}`;
}

addButton.addEventListener("click", () => {
  const value = taskInput.value.trim();

  if (!value) {
    alert("Please enter a task.");
    return;
  }

  tasks.push(value);
  taskInput.value = "";
  renderTasks();
});

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addButton.click();
  }
});

taskInput.focus();
```

你可能还要顺手补一点 `style.css`，例如：

```css
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

li button {
  background: #ef4444;
}
```

## 5. 提交这次功能

```bash
git add app.js style.css
git commit -m "feat: allow deleting tasks"
git push -u origin feature/delete-task
```

## 6. 在 PR 描述里关闭 Issue

你创建 PR 时，可以在描述里写：

```md
Closes #1
```

这里的 `#1` 指的是 Issue 编号。

PR 合并后，GitHub 会自动把这个 Issue 关闭。

这就是 GitHub 很实用的协作能力之一。

---

## 第十九部分：理解 Rebase，但先停留在“会认”和“会基本用”

很多教程会把 `rebase` 讲得很吓人。你现在先理解核心概念就够了。

## 1. `merge` 和 `rebase` 的直白区别

- `merge`：把两条历史接起来
- `rebase`：把你的提交搬到另一条更新后的历史后面

## 2. 为什么常见命令是 `git pull --rebase`

因为它通常能让历史更线性，不容易出现一堆没必要的 merge commit。

## 3. 你现在最实用的用法

只要在更新主分支时优先用：

```bash
git pull --rebase
```

就已经很不错了。

## 4. 如果 rebase 时冲突了怎么办

基本流程是：

```bash
git status
# 手动改冲突文件
git add <file>
git rebase --continue
```

如果不想继续：

```bash
git rebase --abort
```

这块你已经可以配合前面的冲突练习册一起练。

---

## 第二十部分：打标签，理解版本发布

版本标签不是每天都用，但它能帮助你形成“里程碑”的概念。

## 1. 创建一个标签

假设你现在完成了第一版小项目，可以执行：

```bash
git tag v1.0.0
```

## 2. 查看标签

```bash
git tag
```

## 3. 推送标签到 GitHub

```bash
git push origin v1.0.0
```

## 4. 标签是干什么的

你可以把标签理解成：

“给某个重要提交打一个人类更容易记住的名字。”

比如：

- `v1.0.0`
- `v1.1.0`
- `release-2026-03-23`

以后你在 GitHub 上还可以基于标签做 Release。

---

## 第二十一部分：你现在已经练过的完整流程

到这里，你其实已经走过一个很完整的 Git/GitHub 训练链条：

1. 本地新建项目目录
2. `git init`
3. 创建文件
4. `git status`
5. `git add`
6. `git commit`
7. `git diff`
8. `git restore`
9. 创建分支
10. 合并分支
11. 手动解决冲突
12. 创建 GitHub 仓库
13. `git remote add origin`
14. `git push`
15. 创建 PR
16. 合并 PR
17. 远程修改后本地 `pull --rebase`
18. `git stash`
19. `git revert`
20. `git tag`

你如果能把这些都照着做一遍，已经不是“只会最基本操作”了。

---

## 第二十二部分：每一步你都应该怎么理解 `git status`

这一节我专门写给“经常看不懂状态输出”的你。

## 1. 新建文件但没 add

你会看到：

```text
Untracked files:
```

意思是：Git 看到文件了，但还没开始管理。

## 2. 改了文件但没 add

你会看到：

```text
Changes not staged for commit:
```

意思是：你改了文件，但还没放进暂存区。

## 3. add 之后

你会看到：

```text
Changes to be committed:
```

意思是：这些改动已经准备好，下次 commit 会带上它们。

## 4. commit 之后

你会看到：

```text
nothing to commit, working tree clean
```

意思是：当前仓库很干净。

## 5. 本地提交了但还没 push

你可能会看到：

```text
Your branch is ahead of 'origin/main' by 1 commit.
```

意思是：你本地比远程多 1 个提交，去 `git push`。

## 6. GitHub 上多了提交，本地还没同步

你可能会看到：

```text
Your branch is behind 'origin/main' by 1 commit.
```

意思是：远程比你新，你要先 `git pull --rebase`。

只要你会看这 6 种状态，日常大部分情况都能判断。

---

## 第二十三部分：推荐你亲手重复做的 5 个小练习

如果你想把手感练出来，推荐你在这个项目上再重复做下面这些练习。

## 练习 1：只提交一个文件

同时改 2 个文件，只 add 其中 1 个，再提交。

## 练习 2：改错后恢复

故意改坏一个文件，然后用 `git restore` 恢复。

## 练习 3：功能分支开发

新建一个分支，加一个小功能，提交后再 merge 回 `main`。

## 练习 4：故意制造一次冲突

两个分支改同一行，手动解决。

## 练习 5：GitHub 网页和本地各改一次

先在 GitHub 网页改 README，再回本地 `git pull --rebase`。

如果你能把这 5 个动作反复做熟，Git 会开始变得顺手。

---

## 第二十四部分：你最容易踩的坑

## 1. 把 `commit` 当成“上传”

其实 `commit` 只发生在本地。

## 2. 一上来就 `git add .`

不是不能用，而是用之前要先看清楚当前目录里到底改了什么。

## 3. 不看 `git status`

很多问题其实 `git status` 已经把答案写出来了。

## 4. 不开分支直接在 `main` 上乱写

会让历史和协作都变乱。

## 5. 看到冲突就只想删标记

重点不是删标记，而是留下正确的最终内容。

## 6. 已经推送到远程的错误提交，乱用 `reset --hard`

公共历史尽量优先用 `revert`。

## 7. 一个提交塞太多事

以后尽量让每次提交表达一个清晰主题。

---

## 第二十五部分：你可以直接背下来的高频命令

```bash
git status
git add .
git add <file>
git commit -m "message"
git diff
git diff --staged
git log --oneline --graph --decorate
git restore <file>
git restore --staged <file>
git branch
git switch -c feature/name
git switch main
git merge feature/name
git branch -d feature/name
git remote -v
git remote add origin <url>
git push -u origin main
git push -u origin feature/name
git pull --rebase
git stash
git stash pop
git revert HEAD
git tag v1.0.0
```

---

## 第二十六部分：这份教程做完后，你下一步该怎么学

建议按这个顺序继续：

1. 把这份教程完整做一遍
2. 不看教程，再自己独立做第二遍
3. 在 GitHub 上完整走 2 次 PR 流程
4. 重做一次冲突练习
5. 开始学 `rebase` 和更规范的提交历史整理

你不用急着一下子学完所有高级命令。先把这份教程练顺，已经会超过很多“用很久但一直糊里糊涂”的人。

---

## 第二十七部分：最后送你一个判断标准

以后你每次操作 Git 时，先问自己这 6 个问题：

1. 我现在在哪个分支？
2. 我改动还在工作区吗？
3. 我有没有 add 到暂存区？
4. 我有没有 commit 到本地历史？
5. 我有没有 push 到 GitHub？
6. 我现在是想新增内容、撤销内容，还是同步内容？

如果这 6 个问题你越来越能快速回答，说明你真的在掌握 Git，而不是只在背命令。

---

## 建议你怎么配合我继续学

最有效的方法不是继续看更多概念，而是你边做，我边陪你拆。

你可以接下来这样继续：

1. 按这份教程在终端里实际做一遍
2. 每做完一节，把你的 `git status` 输出发给我
3. 我逐行帮你解释你当前到底处在什么状态
4. 如果报错，我直接带你排查

这样你进步会非常快。

教程采用codex编写。GPT5.4，你是真神。
