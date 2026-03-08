# chihiro.design ポートフォリオサイト 更新マニュアル

> このドキュメントはAIエージェント（Manus）が迷わず更新作業を行えるよう作成されたマニュアルです。
> 更新作業を始める前に必ずこのファイルを読んでください。

---

## リポジトリ構成

```
portfolio-site/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Projectsページ（トップ）
│   │   ├── profile/page.tsx  # Profileページ
│   │   └── contact/page.tsx  # Contactページ
│   ├── components/
│   │   ├── ProjectCard.tsx   # プロジェクトカード
│   │   ├── ProjectModal.tsx  # プロジェクト詳細モーダル
│   │   ├── MasonryGrid.tsx   # グリッドレイアウト
│   │   ├── FilterBar.tsx     # カテゴリフィルター
│   │   ├── Navbar.tsx        # ナビゲーション
│   │   └── SkillChart.tsx    # スキルチャート（Profile用）
│   └── data/
│       └── projects.json     # ★ プロジェクトデータ（唯一の更新対象）
└── public/
    └── images/               # ★ サムネイル画像の置き場所
```

---

## プロジェクト追加・更新の手順

### 1. 画像を追加する場合

```bash
cp /path/to/image.png /home/ubuntu/portfolio-site/public/images/ファイル名.png
```

- ファイル名はプロジェクトIDと合わせると管理しやすい（例: `quiz-ad-video.png`）
- YouTube動画の場合は画像不要（`imageUrl`にYouTube thumbnail URLを使用）

### 2. projects.jsonを編集する

`src/data/projects.json` に以下の形式でエントリを追加または編集する。

```json
{
  "id": "unique-id",
  "title": "プロジェクトタイトル",
  "description": "説明文",
  "imageUrl": "/images/ファイル名.png",
  "link": "https://...",
  "linkDoc": "https://...",
  "embedUrl": "https://www.youtube.com/embed/VIDEO_ID",
  "category": ["AI Work"],
  "date": "2025/01",
  "tools": ["Photoshop", "After Effects"],
  "charge": "担当内容",
  "scale": "2名",
  "developmentScale": "2名",
  "featured": false,
  "order": 1
}
```

**フィールド説明：**

| フィールド | 必須 | 説明 |
|---|---|---|
| `id` | ✅ | 英数字ハイフン区切りのユニークID |
| `title` | ✅ | 表示タイトル |
| `description` | ✅ | 説明文 |
| `imageUrl` | ✅ | `/images/xxx.png` または YouTube thumbnail URL |
| `link` | - | 外部リンク（Webサイト、YouTube等） |
| `linkDoc` | - | ドキュメント・記事リンク |
| `embedUrl` | - | YouTube埋め込みURL（`https://www.youtube.com/embed/VIDEO_ID`） |
| `category` | ✅ | 下記カテゴリから1つ以上選択 |
| `date` | ✅ | `YYYY/MM` 形式（並び順に使用） |
| `tools` | - | 使用ツールの配列 |
| `charge` | - | 担当内容 |
| `scale` | - | 開発規模（例: `2名`） |
| `developmentScale` | - | `scale`と同じ（旧フィールド、どちらか一方でOK） |
| `featured` | - | `true`にすると目立つ表示（通常は`false`） |
| `order` | ✅ | 表示順（数値が小さいほど上位） |

**利用可能なカテゴリ：**
- `AI Work`
- `3D WORKS`
- `2D WORKS`
- `Video Edit`
- `UI/UX`
- `Promotion`
- `Picture Book`
- `Manga`
- `Original`

### 3. orderを日付順に自動再計算する（推奨）

新しいエントリを追加したら、以下のスクリプトで全件のorderを日付降順で振り直す。

```bash
node /home/ubuntu/fix-order.js
```

または以下のワンライナーで実行：

```bash
cd /home/ubuntu/portfolio-site && node -e "
const fs = require('fs');
const path = './src/data/projects.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));
function dateToNum(d) {
  if (!d) return 0;
  const parts = d.split('/');
  return parseInt(parts[0]) * 100 + parseInt(parts[1] || 0);
}
data.sort((a, b) => dateToNum(b.date) - dateToNum(a.date));
data.forEach((p, i) => { p.order = i + 1; });
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Done. Total:', data.length);
"
```

### 4. ビルドしてGitHubにプッシュする

```bash
cd /home/ubuntu/portfolio-site
npm run build
git add -A
git commit -m "feat: add/update project [プロジェクト名]"
git push origin main
```

プッシュ後、Vercelが自動でデプロイを開始する（1〜2分）。

---

## Profileページの更新

### スキルチャートの変更

`src/components/SkillChart.tsx` の `skillData` 配列を編集する。

```typescript
const skillData = [
  { name: 'AI Generation', value: 95 },
  { name: 'Creative Direction', value: 90 },
  // ...
];
```

- `value` は 0〜100 の数値
- レーダーチャートの `min` は `60` に設定済み（全スキルが高水準に見える）

### プロフィール文章・Tools・Awardsの変更

`src/app/profile/page.tsx` の冒頭にある定数を編集する。

```typescript
const tools = ['Claude Code', 'Manus AI', ...];
const awards = [{ year: '2025', title: '...' }, ...];
```

---

## よくある作業パターン

### YouTube動画を追加する

```json
{
  "id": "video-title-slug",
  "title": "動画タイトル",
  "description": "説明",
  "imageUrl": "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
  "link": "https://www.youtube.com/watch?v=VIDEO_ID",
  "embedUrl": "https://www.youtube.com/embed/VIDEO_ID",
  "category": ["AI Work"],
  "date": "2025/01",
  "order": 1
}
```

### 外部記事・Webサイトリンクを追加する

```json
{
  "id": "article-slug",
  "title": "記事タイトル",
  "description": "説明",
  "imageUrl": "/images/article-thumbnail.png",
  "link": "https://example.com/article",
  "category": ["AI Work"],
  "date": "2025/01",
  "order": 1
}
```

---

## デプロイ先

- **本番URL**: https://www.chihiro.design
- **GitHubリポジトリ**: https://github.com/chihiroDesign/portfolio-site
- **Vercel**: mainブランチへのプッシュで自動デプロイ

---

## 注意事項

- `projects.json` 以外のファイルは、明示的に指示がない限り変更しない
- 画像ファイルは必ず `public/images/` に配置する
- ビルドエラーが出た場合は `npm run build 2>&1 | head -50` でエラー内容を確認する
- orderの振り直しは毎回実行することを推奨（日付順が崩れるため）
