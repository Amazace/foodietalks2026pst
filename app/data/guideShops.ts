
import { guideStories } from "./guideStories";

export type Meal =
  | "全部"
  | "早餐"
  | "午餐"
  | "下午茶"
  | "晚餐"
  | "宵夜";

export type GuideShop = {
  id: number;
  name: string;
  meal: Exclude<Meal, "全部">;
  description: string;
  story: string[];
  images: string[];
};

export const meals: Meal[] = [
  "全部",
  "早餐",
  "午餐",
  "下午茶",
  "晚餐",
  "宵夜",
];

// 店家基本資料
// TODO：核對 meal、description 與 images
// 未確認的分類暫設為「午餐」，不代表實際營業時段。

const shopData: Omit<GuideShop, "story">[] = [
  {
    id: 1,
    name: "忠順美",
    meal: "早餐",
    description: "這裡沒有標準答案，只有被記得的人。",
    images: [
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    id: 2,
    name: "33活力早餐",
    meal: "早餐",
    description: "一份吐司，從台中紅到台北",
    images: [],
  },
  {
    id: 3,
    name: "豬芙蕾",
    meal: "早餐",
    description: "一家可以從早吃到晚的鬆餅店",
    images: [],
  },
  {
    id: 4,
    name: "巧味豬腳",
    meal: "午餐",
    description: "市場裡的飄香豬腳舖",
    images: [],
  },
  {
    id: 5,
    name: "Baksa手工窯烤披薩",
    meal: "午餐",
    description: "「Baksa」=食材×手作×人情味",
    images: [],
  },
  {
    id: 6,
    name: "基本麵食館",
    meal: "午餐",
    description: "用最純粹的料理顧好基本盤",
    images: [],
  },
  {
    id: 7,
    name: "客家仙草",
    meal: "下午茶",
    description: "桂圓香裡真材實料的堅持",
    images: [],
  },
  {
    id: 8,
    name: "政大茶亭",
    meal: "下午茶",
    description: "政大人的共同記憶",
    images: [],
  },
  {
    id: 9,
    name: "豆荳先生",
    meal: "下午茶",
    description: "把十年的修煉放進一杯有溫度的咖啡",
    images: [],
  },
  {
    id: 10,
    name: "豆花日嚐",
    meal: "下午茶",
    description: "一碗豆花，日常的小確幸",
    images: [],
  },
  {
    id: 11,
    name: "純地瓜球",
    meal: "下午茶",
    description: "傳承三十年，只為一顆「純」地瓜球",
    images: [],
  },
  {
    id: 12,
    name: "首思義",
    meal: "晚餐",
    description: "把創意義式料理做得「剛剛好」",
    images: [],
  },
  {
    id: 13,
    name: "徙巷小餐酒",
    meal: "晚餐",
    description: "小恩的獨立餐酒計畫",
    images: [],
  },
  {
    id: 14,
    name: "老味道",
    meal: "晚餐",
    description: "一個人也能大快朵頤的火鍋",
    images: [],
  },
  {
    id: 15,
    name: "滿豐牛肉麵",
    meal: "晚餐",
    description: "在木柵，一碗撐過現實的湯頭",
    images: [],
  },
  {
    id: 16,
    name: "敘緣小館",
    meal: "晚餐",
    description: "今天，我們下館子",
    images: [],
  },
  {
    id: 17,
    name: "軌跡",
    meal: "宵夜",
    description: "你在這裡，不會是一個人",
    images: [],
  },
  {
    id: 18,
    name: "咚 關東煮",
    meal: "宵夜",
    description: "曇花一現的絕版滋味",
    images: [],
  },
  {
    id: 19,
    name: "捲毛蜜汁燒烤",
    meal: "宵夜",
    description: "宵夜，肯定得來點燒烤",
    images: [],
  },
  {
    id: 20,
    name: "健康滷味",
    meal: "宵夜",
    description: "走過二十八年的街邊滷香",
    images: [],
  },
];

// 保留第 1 家原本已完成的故事
const zhongShunMeiStory: string[] = [
  "乍看之下，忠順美只是一家再普通不過的早餐店。蛋餅、吐司、鐵板麵，煎台上滋滋作響的聲音一如往常，連名字都帶著樸素的台味。但只要在店裡稍坐片刻，你便會發現這家店立足此地二十餘年的秘密。",
  "忠順美的日常，始於老闆娘小康熱情的招呼，她記得每位常客的「老樣子」，也接受選擇障礙的「今天隨便」，主客間的信任成了一道特殊的風景。在這裡，早餐的選擇從不受限於菜單，小康笑稱，是來店的顧客們不嫌棄她的手藝，才有機會可以「自由發揮」。",
  "即使是菜單上的品項，你也能找出藏在字裡行間的新奇玩意：炒蘿蔔糕、雞蛋灌餅，每一樣都前所未見。小康說，這些都是街坊們主動向她推薦的菜式，熱情的客人們把材料連做法都一併教給她。店裡的工作分成外場和煎台，小康負責外場的組裝和送餐，煎台平日由助理阿姨掌廚，假日班則交給小康的丈夫支援。",
  "假日人潮密集時，小康的兩個兒子和住在附近的工讀妹妹也會適時出現，幫忙處理店裡的生 意。小康總告訴孩子，每個人都是家裡的一份子，任何事情都該一起參與，哪怕是店裡的工作也不例外，這塑造了兩人凡事認真、盡責的個性，忠順美閣樓的牆上至今仍貼滿了各種便條紙，那是小康的大兒子準備國考時，逐句背下的條例和法規。",
  "對於店裡溫馨的氛圍，小康覺得關鍵在於對待客人的態度：像朋友一樣「互相照顧」，這樣的關係就可以維持很久很久。目前光顧忠順美的客人，約有六成是認得出臉的熟客，這家小店二十年來的默默耕耘，以及和客人間珍貴的連結，也將繼續編織出新的篇章。",
];

// 自動合併基本資料與故事
export const guideShops: GuideShop[] = shopData.map(
  (shop) => ({
    ...shop,
    story:
      shop.id === 1
        ? zhongShunMeiStory
        : guideStories[shop.id] ?? [],
  })
);
