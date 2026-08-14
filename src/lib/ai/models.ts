// Product-facing AI model catalog. The frontend NEVER sees provider model ids.
export type ProductModelId = "student_lite" | "student_thinker" | "student_pro";

export type ProductModel = {
  id: ProductModelId;
  emoji: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionAm: string;
  capabilities: string[];
};

export const PRODUCT_MODELS: ProductModel[] = [
  {
    id: "student_lite",
    emoji: "⚡",
    name: "ተማሪ Lite",
    nameEn: "Temari Lite",
    description: "Fast help for everyday learning.",
    descriptionAm: "ለዕለት ተዕለት ትምህርት ፈጣን እገዛ።",
    capabilities: ["chat", "basic-file", "basic-ocr", "basic-vision", "simple-create"],
  },
  {
    id: "student_thinker",
    emoji: "🧠",
    name: "ተማሪ Thinker",
    nameEn: "Temari Thinker",
    description: "Think deeper. Learn better.",
    descriptionAm: "በጥልቀት አስብ። በተሻለ ተማር።",
    capabilities: ["chat", "reasoning", "advanced-file", "advanced-ocr", "vision", "quiz"],
  },
  {
    id: "student_pro",
    emoji: "🚀",
    name: "ተማሪ Pro",
    nameEn: "Temari Pro",
    description: "Create, build, research, and learn.",
    descriptionAm: "ፍጠር፣ ገንባ፣ መርምር እና ተማር።",
    capabilities: [
      "chat",
      "reasoning",
      "images",
      "image-edit",
      "documents",
      "pdf",
      "live",
      "projects",
    ],
  },
];

export const DEFAULT_MODEL: ProductModelId = "student_lite";

export function getProductModel(id: string | undefined | null): ProductModel {
  return PRODUCT_MODELS.find((m) => m.id === id) ?? PRODUCT_MODELS[0]!;
}