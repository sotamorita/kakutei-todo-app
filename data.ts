
import { Question, Task, TaskCategory } from './types';

// ==========================================
// 0. Glossary (Definitions for Tooltips)
// ==========================================
export const GLOSSARY: Record<string, string> = {
  '源泉徴収票': '1年間に会社から支払われた給与などの総額と、そこから天引きされた税金の額が書かれた書類です。通常、12月または1月に勤務先から受け取ります。',
  '支払調書': 'フリーランス等が報酬を受け取った際に、支払元から交付される書類です。源泉徴収票と似ていますが、発行義務は必ずしもないため、手元にない場合は自分で金額を集計する必要があります。',
  '雑所得': '給与所得、事業所得など他の9種類の所得に当てはまらない所得です。副業の収入、公的年金等、暗号資産（仮想通貨）の利益などがこれに含まれます。',
  '事業所得': '農業、漁業、製造業、卸売業、小売業、サービス業その他の「事業」から生ずる所得です。継続して安定した収入がある副業もここに含まれる場合があります。',
  '不動産所得': '土地や建物などの不動産の貸付から生ずる所得です。',
  '収支内訳書': '白色申告をする人が作成する、1年間の収入と経費をまとめた計算書です。',
  '青色申告決算書': '青色申告をする人が作成する決算書です。複式簿記などで日々の取引を記録し、それに基づいて作成します。特別控除（最大65万円）などのメリットがあります。',
  '特定口座': '証券会社が顧客に代わって上場株式等の譲渡損益等を計算してくれる口座です。「源泉徴収あり」を選択している場合、確定申告は原則不要です。',
  '年間取引報告書': '特定口座を開設している証券会社から送られてくる、1年間の株取引の利益・損失がまとめられた書類です。',
  '損益通算': '一定期間内の「利益」と「損失」を相殺することです。例えば、A証券の赤字をB証券の黒字と相殺して、税金を減らすことができます。',
  '繰越控除': '今年の損失を、翌年以降（最大3年間）に繰り越して、将来の利益と相殺できる制度です。',
  '医療費控除': '1月1日から12月31日までの間に支払った医療費が一定額（通常10万円）を超えた場合に受けられる控除です。',
  'セルフメディケーション税制': '健康診断を受けている人が、対象の市販薬を年間1万2000円以上購入した場合に受けられる特例です（通常の医療費控除とは選択制）。',
  'ワンストップ特例': '確定申告をしなくてもふるさと納税の寄付金控除を受けられる仕組みです。1年間の寄付先が5自治体以内で、確定申告をする必要がない給与所得者などが利用できます。確定申告をする場合は無効になるため、寄付金控除として再度申告が必要です。',
  'iDeCo': '個人型確定拠出年金のこと。掛金が全額「小規模企業共済等掛金控除」の対象となり、所得税・住民税が軽減されます。',
  '雑損控除': '災害や盗難、横領によって資産に損害を受けた場合に受けられる控除です。詐欺や恐喝による損害は対象外です。',
  'e-Tax': '国税電子申告・納税システムのこと。インターネットを利用して自宅から申告ができます。',
};

// ==========================================
// 1. Task Definitions (The database of To-Dos)
// ==========================================
export const TASKS: Record<string, Task> = {
  // --- Q1: 副業・2か所給与 ---
  'q1-prep-docs': {
    id: 'q1-prep-docs',
    title: '副業先の「支払調書」または「源泉徴収票」を用意する',
    category: TaskCategory.PREPARATION,
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1900.htm',
    referenceLabel: '国税庁：給与所得者が確定申告が必要な場合',
  },
  'q1-prep-expenses': {
    id: 'q1-prep-expenses',
    title: '副業にかかった経費の領収書を集計する',
    category: TaskCategory.PREPARATION,
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1900.htm',
    referenceLabel: '国税庁：給与所得者が確定申告が必要な場合',
  },
  'q1-input': {
    id: 'q1-input',
    title: '「雑所得」または「事業所得」として申告書を作成する',
    category: TaskCategory.INPUT,
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1900.htm',
    referenceLabel: '国税庁：給与所得者が確定申告が必要な場合',
  },

  // --- Q2: 公的年金等 ---
  'q2-prep-docs': {
    id: 'q2-prep-docs',
    title: '日本年金機構などから届く「公的年金等の源泉徴収票」を用意する',
    category: TaskCategory.PREPARATION,
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1600.htm',
    referenceLabel: '国税庁：公的年金等の課税関係',
  },

  // --- Q3: 不動産収入 ---
  'q3-prep-income': {
    id: 'q3-prep-income',
    title: '賃料収入がわかる通帳や明細を用意する',
    category: TaskCategory.PREPARATION,
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1370.htm',
    referenceLabel: '国税庁：不動産収入がある場合',
  },
  'q3-prep-expense': {
    id: 'q3-prep-expense',
    title: '固定資産税の通知書、保険料、修繕費の領収書を用意する',
    category: TaskCategory.PREPARATION,
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1370.htm',
    referenceLabel: '国税庁：不動産収入がある場合',
  },
  'q3-input': {
    id: 'q3-input',
    title: '「不動産所得の収支内訳書（青色申告決算書）」を作成する',
    category: TaskCategory.INPUT,
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1370.htm',
    referenceLabel: '国税庁：不動産収入がある場合',
  },

  // --- Q4: 株式・投資信託（利益） ---
  'q4-prep-report': {
    id: 'q4-prep-report',
    title: '証券会社の「年間取引報告書」を用意する',
    category: TaskCategory.PREPARATION,
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1463.htm',
    referenceLabel: '国税庁：株式等の譲渡所得等',
  },

  // --- Q5: 株式・投資信託（損失の繰越） ---
  'q5-input-loss': {
    id: 'q5-input-loss',
    title: '損失を翌年以降に繰り越すための申告（損益通算）を行う',
    category: TaskCategory.INPUT,
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1474.htm',
    referenceLabel: '国税庁：上場株式等の譲渡損失の繰越控除',
  },
  'q5-check-insurance': {
    id: 'q5-check-insurance',
    title: '申告することで国民健康保険料等に影響が出る可能性があるため確認する',
    category: TaskCategory.PREPARATION,
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1474.htm',
    referenceLabel: '国税庁：上場株式等の譲渡損失の繰越控除',
  },

  // --- Q6: 暗号資産（仮想通貨） ---
  'q6-prep-report': {
    id: 'q6-prep-report',
    title: '各取引所から年間取引報告書をダウンロードする',
    category: TaskCategory.PREPARATION,
    referenceUrl: 'https://www.nta.go.jp/publication/pamph/shotoku/kakuteishinkokukankei/kasoutuka/',
    referenceLabel: '国税庁：暗号資産に関する税務上の取扱い',
  },
  'q6-input': {
    id: 'q6-input',
    title: '国税庁の「暗号資産の計算書」などを利用して所得金額を確定させる（雑所得）',
    category: TaskCategory.INPUT,
    referenceUrl: 'https://www.nta.go.jp/publication/pamph/shotoku/kakuteishinkokukankei/kasoutuka/',
    referenceLabel: '国税庁：暗号資産に関する税務上の取扱い',
  },

  // --- Q7: 医療費控除 ---
  'q7-prep-detail': {
    id: 'q7-prep-detail',
    title: '「医療費控除の明細書」を作成する',
    category: TaskCategory.PREPARATION,
    description: '領収書の提出は不要ですが、5年間保存する義務があります。',
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1120.htm',
    referenceLabel: '国税庁：医療費を支払ったとき',
  },
  'q7-check-refund': {
    id: 'q7-check-refund',
    title: '保険金などで補填された金額（高額療養費など）を差し引く',
    category: TaskCategory.PREPARATION,
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1120.htm',
    referenceLabel: '国税庁：医療費を支払ったとき',
  },

  // --- Q8: ふるさと納税・寄付金 ---
  'q8-prep-cert': {
    id: 'q8-prep-cert',
    title: '寄付金受領証明書（またはe-Tax連携データ）を用意する',
    category: TaskCategory.PREPARATION,
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1150.htm',
    referenceLabel: '国税庁：寄附金を支払ったとき',
  },

  // --- Q9: 住宅ローン控除（初年度） ---
  'q9-prep-contract': {
    id: 'q9-prep-contract',
    title: '登記事項証明書、売買契約書、源泉徴収票を用意する',
    category: TaskCategory.PREPARATION,
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1213.htm',
    referenceLabel: '国税庁：住宅借入金等特別控除',
  },
  'q9-prep-bank': {
    id: 'q9-prep-bank',
    title: '金融機関からの「住宅取得資金に係る借入金の年末残高等証明書」を用意する',
    category: TaskCategory.PREPARATION,
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1213.htm',
    referenceLabel: '国税庁：住宅借入金等特別控除',
  },

  // --- Q10: iDeCo ---
  'q10-prep-cert': {
    id: 'q10-prep-cert',
    title: '国民年金基金連合会から10月頃に届くハガキ「小規模企業共済等掛金払込証明書」を用意する',
    category: TaskCategory.PREPARATION,
    referenceUrl: 'https://www.ideco-koushiki.jp/procedure/certificate.html',
    referenceLabel: 'iDeCo公式サイト：払込証明書について',
  },
  'q10-input': {
    id: 'q10-input',
    title: '申告書の「小規模企業共済等掛金控除」の欄に、証明書の金額（1年間の支払総額）を入力する',
    category: TaskCategory.INPUT,
    referenceUrl: 'https://www.ideco-koushiki.jp/procedure/certificate.html',
    referenceLabel: 'iDeCo公式サイト：払込証明書について',
  },

  // --- Q11: 災害・盗難 ---
  'q11-prep-consider': {
    id: 'q11-prep-consider',
    title: '「雑損控除」または「災害減免法」の有利な方を選択して申告する',
    category: TaskCategory.PREPARATION,
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1110.htm',
    referenceLabel: '国税庁：災害や盗難などで資産に損害を受けたとき',
  },

  // --- Common Submission Tasks (Added at end) ---
  'submit-final': {
    id: 'submit-final',
    title: '確定申告書の提出',
    category: TaskCategory.SUBMISSION,
    description: 'e-Tax（電子申告）または税務署への郵送・持参で提出します。',
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/shinkoku/tokushu/teishutsu.htm',
    referenceLabel: '国税庁：申告書の提出方法',
  },
  'pay-tax': {
    id: 'pay-tax',
    title: '納税（または還付金の受取確認）',
    category: TaskCategory.SUBMISSION,
    description: '納税が必要な場合は期限内に手続きを行います。',
    referenceUrl: 'https://www.nta.go.jp/taxes/nozei/index.htm',
    referenceLabel: '国税庁：納税について',
  },
};

// ==========================================
// 2. Question Logic
// ==========================================
export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'メインの給与以外に、副業の収入や、2か所以上からの給与がありますか？（年間20万円以上）',
    guide: '源泉徴収票の「給与所得控除後の金額」と、副業の「収入金額 - 必要経費」の合計を確認してください。会社員で給与以外の所得が20万円を超える場合は原則として申告が必要です。',
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1900.htm',
    referenceLabel: '国税庁：給与所得者が確定申告が必要な場合',
    options: [
      { id: 'yes', label: 'はい', nextQuestionId: 'q2', addTasks: ['q1-prep-docs', 'q1-prep-expenses', 'q1-input'] },
      { id: 'no', label: 'いいえ', nextQuestionId: 'q2' },
    ],
  },
  {
    id: 'q2',
    text: '公的年金等の収入が400万円を超えている、または年金以外の所得が20万円以上ありますか？',
    guide: '「公的年金等の源泉徴収票」を確認してください。支払金額が400万円以下でも、公的年金等に係る雑所得以外の所得が20万円を超える場合は申告が必要です。',
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1600.htm',
    referenceLabel: '国税庁：公的年金等の課税関係',
    options: [
      { id: 'yes', label: 'はい', nextQuestionId: 'q3', addTasks: ['q2-prep-docs'] },
      { id: 'no', label: 'いいえ', nextQuestionId: 'q3' },
    ],
  },
  {
    id: 'q3',
    text: 'マンション経営やアパート貸付などによる不動産収入がありますか？',
    guide: '土地や建物、船舶、航空機の貸付けによる所得があるか確認してください。',
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1370.htm',
    referenceLabel: '国税庁：不動産収入がある場合',
    options: [
      { id: 'yes', label: 'はい', nextQuestionId: 'q4', addTasks: ['q3-prep-income', 'q3-prep-expense', 'q3-input'] },
      { id: 'no', label: 'いいえ', nextQuestionId: 'q4' },
    ],
  },
  {
    id: 'q4',
    text: '特定口座（源泉徴収あり）以外で、株や投資信託の利益が出ましたか？',
    guide: '証券会社から届く「特定口座年間取引報告書」の「源泉徴収の選択」欄が「無」になっている、または一般口座で取引している場合が対象です。',
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1463.htm',
    referenceLabel: '国税庁：株式等の譲渡所得等',
    options: [
      { id: 'yes', label: 'はい', nextQuestionId: 'q5', addTasks: ['q4-prep-report'] },
      { id: 'no', label: 'いいえ', nextQuestionId: 'q5' },
    ],
  },
  {
    id: 'q5',
    text: '今年の株取引は「損失（マイナス）」でしたか？（または過去の損失を繰り越したいですか？）',
    guide: '「特定口座年間取引報告書」の「譲渡損益」がマイナスになっているか確認してください。申告することで翌年以降の利益と相殺できる場合があります。',
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1474.htm',
    referenceLabel: '国税庁：上場株式等の譲渡損失の繰越控除',
    options: [
      { id: 'yes', label: 'はい', nextQuestionId: 'q6', addTasks: ['q5-input-loss', 'q5-check-insurance'] },
      { id: 'no', label: 'いいえ', nextQuestionId: 'q6' },
    ],
  },
  {
    id: 'q6',
    text: '暗号資産（仮想通貨）の売却や交換で、年間20万円以上の利益が出ましたか？',
    guide: '暗号資産交換業者からの年間取引報告書や、ご自身の取引履歴で、売却益・交換益が20万円を超えているか計算してください。',
    referenceUrl: 'https://www.nta.go.jp/publication/pamph/shotoku/kakuteishinkokukankei/kasoutuka/',
    referenceLabel: '国税庁：暗号資産に関する税務上の取扱い',
    options: [
      { id: 'yes', label: 'はい', nextQuestionId: 'q7', addTasks: ['q6-prep-report', 'q6-input'] },
      { id: 'no', label: 'いいえ', nextQuestionId: 'q7' },
    ],
  },
  {
    id: 'q7',
    text: '医療費が年間10万円（総所得200万未満なら5%）を超えましたか？ または、対象の市販薬を1万2000円以上買いましたか？',
    guide: '昨年1年間の医療費の領収書を合計してください。保険金などで補填される金額を差し引いた額が10万円（または総所得の5%）を超えているかが目安です。',
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1120.htm',
    referenceLabel: '国税庁：医療費を支払ったとき',
    options: [
      { id: 'yes', label: 'はい', nextQuestionId: 'q8', addTasks: ['q7-prep-detail', 'q7-check-refund'] },
      { id: 'no', label: 'いいえ', nextQuestionId: 'q8' },
    ],
  },
  {
    id: 'q8',
    text: 'ふるさと納税を行いましたか？（ワンストップ特例を使わない、または6自治体以上）',
    guide: '「ワンストップ特例申請書」を提出していない自治体がある、または寄付先が6自治体以上ある場合は確定申告が必要です。',
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1150.htm',
    referenceLabel: '国税庁：寄附金を支払ったとき',
    options: [
      { id: 'yes', label: 'はい', nextQuestionId: 'q9', addTasks: ['q8-prep-cert'] },
      { id: 'no', label: 'いいえ', nextQuestionId: 'q9' },
    ],
  },
  {
    id: 'q9',
    text: '住宅ローンを利用してマイホームの新築・購入・増改築をし、入居しましたか？（1年目）',
    guide: '住宅ローン控除を受ける最初の年は確定申告が必要です。2年目以降は年末調整で対応可能です。',
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1213.htm',
    referenceLabel: '国税庁：住宅借入金等特別控除',
    options: [
      { id: 'yes', label: 'はい', nextQuestionId: 'q10', addTasks: ['q9-prep-contract', 'q9-prep-bank'] },
      { id: 'no', label: 'いいえ', nextQuestionId: 'q10' },
    ],
  },
  {
    id: 'q10',
    text: 'iDeCo（iDeCo）の掛金を支払っていますか？',
    guide: '掛金を給与天引きではなく、個人の銀行口座から引き落とし（個人払込）にしていて、年末調整で「小規模企業共済等掛金控除」の申告を忘れた・していない場合が対象です。',
    referenceUrl: 'https://www.ideco-koushiki.jp/procedure/certificate.html',
    referenceLabel: 'iDeCo公式サイト：払込証明書について',
    options: [
      { id: 'yes', label: 'はい', nextQuestionId: 'q11', addTasks: ['q10-prep-cert', 'q10-input'] },
      { id: 'no', label: 'いいえ', nextQuestionId: 'q11' },
    ],
  },
  {
    id: 'q11',
    text: '災害や盗難、横領によって資産に損害を受けましたか？',
    guide: '災害や盗難などで住宅や家財に損害を受けた場合、雑損控除などを受けられる可能性があります。',
    referenceUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1110.htm',
    referenceLabel: '国税庁：災害や盗難などで資産に損害を受けたとき',
    options: [
      {
        id: 'yes',
        label: 'はい',
        nextQuestionId: null,
        addTasks: ['q11-prep-consider', 'submit-final', 'pay-tax']
      },
      {
        id: 'no',
        label: 'いいえ',
        nextQuestionId: null,
        addTasks: ['submit-final', 'pay-tax']
      },
    ],
  },
];
