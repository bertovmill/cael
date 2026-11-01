// A small example meal bank, seeded on first boot when the bank is empty
// (applySchema in lib/db.ts). Replace these with your own on /meals: the
// planner and the agent only ever pick meals from the bank.

export interface ExampleMeal {
  slot: string;
  name: string;
  description: string;
  /** Plain names — they feed the Groceries list. */
  ingredients: string[];
  minutes: number;
  /** The recipe's ingredient list with amounts, for one serving. */
  lines: string[];
  steps: string[];
}

export const EXAMPLE_MEALS: ExampleMeal[] = [
  {
    slot: "snack",
    name: "Mango, papaya & lime plate",
    description: "Ripe mango and papaya, sliced and squeezed with lime. Nothing else.",
    ingredients: ["Mango", "Papaya", "Lime"],
    minutes: 5,
    lines: ["1 ripe mango", "½ small ripe papaya", "½ lime"],
    steps: [
      "Slice the mango cheeks off the stone, score the flesh in a grid and turn each cheek inside out.",
      "Halve the papaya, scoop out the seeds and cut it into long wedges.",
      "Arrange on a plate and squeeze the lime over everything. Eat it on its own and wait at least 30 minutes before anything else.",
    ],
  },
  {
    slot: "snack",
    name: "Watermelon & mint",
    description: "Big chilled wedges of watermelon torn with fresh mint — the most water-rich start there is.",
    ingredients: ["Watermelon", "Mint"],
    minutes: 5,
    lines: ["¼ small watermelon, well chilled", "6 fresh mint leaves"],
    steps: [
      "Cut the watermelon into thick wedges or big chunks.",
      "Tear the mint over the top and serve straight from the fridge.",
    ],
  },
  {
    slot: "meal2",
    name: "Rainbow chopped salad with grilled chicken",
    description: "Romaine, cucumber, tomato, peppers and radish with sliced grilled chicken and a lemon-olive oil dressing. No bread.",
    ingredients: ["Chicken breast", "Romaine", "Cucumber", "Cherry tomatoes", "Peppers", "Radish", "Lemon", "Olive oil"],
    minutes: 25,
    lines: ["1 chicken breast (about 200 g)", "1 romaine heart", "½ cucumber", "1 cup cherry tomatoes", "½ red pepper", "½ yellow pepper", "4 radishes", "1 lemon", "2 tbsp olive oil", "Salt and pepper"],
    steps: [
      "Pound the chicken to an even thickness, rub with 1 tsp oil, salt and pepper, and grill or pan-sear 5–6 minutes a side until cooked through. Rest 5 minutes.",
      "Chop the romaine, cucumber, peppers and radishes into small even pieces; halve the tomatoes.",
      "Whisk the juice of the lemon with the rest of the oil and a pinch of salt.",
      "Toss the vegetables with the dressing, pile into a big bowl and top with the sliced chicken.",
    ],
  },
  {
    slot: "meal2",
    name: "Avocado & sprout power salad",
    description: "Spinach, sprouts, cucumber and avocado with pumpkin seeds and a lemon-tahini drizzle.",
    ingredients: ["Spinach", "Alfalfa sprouts", "Cucumber", "Avocado", "Pumpkin seeds", "Tahini", "Lemon"],
    minutes: 10,
    lines: ["3 big handfuls baby spinach", "1 cup alfalfa sprouts", "½ cucumber, sliced", "1 ripe avocado", "2 tbsp pumpkin seeds", "1 tbsp tahini", "½ lemon", "Salt"],
    steps: [
      "Toast the pumpkin seeds in a dry pan for 2–3 minutes until they pop.",
      "Whisk the tahini with the lemon juice, a pinch of salt and enough water to make it pourable.",
      "Layer the spinach, cucumber and sprouts; slice the avocado over the top.",
      "Drizzle with the tahini and scatter the seeds.",
    ],
  },
  {
    slot: "meal3",
    name: "Lemon-herb salmon with asparagus",
    description: "Pan-seared salmon with roasted asparagus and a big green salad. No rice.",
    ingredients: ["Salmon fillets", "Asparagus", "Lemon", "Dill", "Mixed greens", "Olive oil"],
    minutes: 20,
    lines: ["1 salmon fillet (about 180 g)", "1 bunch asparagus, ends snapped", "1 lemon", "2 tbsp chopped dill", "2 handfuls mixed greens", "2 tbsp olive oil", "Salt and pepper"],
    steps: [
      "Heat the oven to 425°F (220°C). Toss the asparagus with 1 tsp oil and salt and roast 10–12 minutes.",
      "Pat the salmon dry and season. Sear skin-side down in 1 tsp oil over medium-high heat for 4–5 minutes until crisp, flip and cook 2 minutes more.",
      "Off the heat, squeeze half the lemon over the salmon and scatter the dill.",
      "Dress the greens with the rest of the lemon and oil and serve everything together.",
    ],
  },
  {
    slot: "meal3",
    name: "Zucchini noodles with turkey meatballs",
    description: "Spiralised zucchini, fresh tomato-basil sauce and baked turkey meatballs. No pasta.",
    ingredients: ["Zucchini", "Ground turkey", "Tomatoes", "Basil", "Garlic", "Olive oil"],
    minutes: 35,
    lines: ["250 g ground turkey", "2 medium zucchini", "4 ripe tomatoes (or 1 can whole tomatoes)", "Handful basil", "2 garlic cloves", "1 egg", "1 tbsp olive oil", "½ tsp dried oregano", "Salt and pepper"],
    steps: [
      "Heat the oven to 400°F (200°C). Mix the turkey, egg, half the garlic (grated), oregano, salt and pepper; roll into 10 balls and bake on a lined tray 18–20 minutes.",
      "Sizzle the remaining garlic, sliced, in the oil. Add the chopped tomatoes and a pinch of salt and simmer 15 minutes, crushing them as they soften. Tear in the basil.",
      "Spiralise the zucchini and toss in a hot pan for 1–2 minutes — just warmed, not soggy.",
      "Top the noodles with the sauce and meatballs.",
    ],
  },
];
