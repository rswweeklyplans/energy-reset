
import React from 'react';
import { MealCategory, ShoppingCategory } from './types';

export const PROTOCOL_HABITS = [
  'Protein before caffeine',
  'Morning sunlight (15m)',
  'Daily Movement',
  'No caffeine after 11am',
  'No screens 1hr before bed',
  'Evening wind-down',
  'Daily Supplements'
];

export const MEAL_PLANS: MealCategory[] = [
  {
    category: "Breakfast",
    options: [
      {
        title: "Veggie Scramble with Sweet Potato Hash",
        items: ["2-3 eggs with spinach & peppers", "½ avocado", "Sweet potato hash"],
        ingredients: ["2-3 eggs", "Spinach & peppers", "½ avocado", "Sweet potato", "Olive oil, salt, pepper"],
        instructions: [
          "Dice sweet potato and sauté in olive oil over medium heat 8-10 minutes until browned.",
          "Add chopped peppers and spinach; cook until softened.",
          "Whisk eggs with salt and pepper, pour into pan, and gently scramble.",
          "Serve with sliced avocado on top or side."
        ],
        optionalUpgrade: "Add ground turkey or feta cheese for extra protein."
      },
      {
        title: "Protein Smoothie",
        items: ["1 scoop protein", "1 cup berries", "Spinach & almond butter"],
        ingredients: ["1 scoop protein powder", "1 cup berries", "Handful spinach", "1 tbsp almond butter", "1-1½ cups almond or coconut milk", "Ice"],
        instructions: [
          "Add all ingredients to blender.",
          "Blend until smooth and creamy.",
          "Adjust thickness with more liquid or ice."
        ],
        optionalUpgrade: "Add chia or flax seeds for fiber and satiety."
      },
      {
        title: "Greek Yogurt Power Bowl",
        items: ["Full-fat Greek yogurt", "Berries & nuts", "Dash of cinnamon"],
        ingredients: ["Full-fat Greek yogurt", "Mixed berries", "Handful nuts or seeds", "Cinnamon drizzle"],
        instructions: [
          "Add yogurt to bowl.",
          "Top with berries and nuts.",
          "Sprinkle cinnamon and drizzle honey if desired."
        ],
        optionalUpgrade: "Add collagen or protein powder mixed into yogurt."
      },
      {
        title: "Simple & Fast Breakfast",
        items: ["2 turkey sausages", "Apple with almond butter", "Raw walnuts"],
        ingredients: ["2 turkey sausages", "Apple slices", "Almond butter", "Handful walnuts"],
        instructions: [
          "Heat sausages in skillet or microwave.",
          "Slice apple and serve with almond butter.",
          "Add walnuts on the side."
        ],
        optionalUpgrade: "Add hard-boiled eggs for extra protein."
      }
    ]
  },
  {
    category: "Lunch",
    options: [
      {
        title: "The Big Salad",
        items: ["4-6oz protein", "Mixed greens & avocado", "Olive oil dressing"],
        ingredients: ["4-6 oz cooked protein", "Mixed greens", "Avocado", "Olive oil + lemon or vinegar", "Optional veggies"],
        instructions: [
          "Add greens to large bowl.",
          "Top with protein and chopped veggies.",
          "Add avocado slices.",
          "Drizzle olive oil and lemon; toss and serve."
        ],
        optionalUpgrade: "Add roasted sweet potato or quinoa."
      },
      {
        title: "Protein Power Bowl",
        items: ["Ground turkey/beef", "Quinoa or rice", "Roasted seasonal veggies"],
        ingredients: ["Ground beef or turkey", "Cooked rice or quinoa", "Roasted vegetables", "Olive oil or sauce"],
        instructions: [
          "Cook ground meat in skillet with seasoning.",
          "Roast veggies at 400°F for 20 minutes.",
          "Assemble bowl with grains, meat, veggies.",
          "Add sauce or olive oil."
        ],
        optionalUpgrade: "Top with avocado or fermented veggies."
      },
      {
        title: "Soup + Protein Bowl",
        items: ["Bone broth base", "Shredded chicken", "Side of sauerkraut"],
        ingredients: ["Bone broth", "Shredded chicken", "Veggies", "Sauerkraut side"],
        instructions: [
          "Heat broth in pot.",
          "Add shredded chicken and vegetables.",
          "Simmer 5-8 minutes.",
          "Serve with sauerkraut on side."
        ],
        optionalUpgrade: "Add rice or potatoes for heartier meal."
      },
      {
        title: "Lettuce Wrap Tacos",
        items: ["Ground beef/turkey", "Butter lettuce wraps", "Fresh guac & salsa"],
        ingredients: ["Ground beef or turkey", "Butter lettuce leaves", "Guacamole", "Salsa"],
        instructions: [
          "Brown meat in skillet with taco seasoning.",
          "Spoon meat into lettuce leaves.",
          "Add guacamole and salsa.",
          "Fold and eat like tacos."
        ],
        optionalUpgrade: "Add sautéed peppers and onions."
      }
    ]
  },
  {
    category: "Dinner",
    options: [
      {
        title: "Salmon & Greens Plate",
        items: ["Baked/grilled salmon", "Brussels sprouts", "Cauliflower rice"],
        ingredients: ["Salmon fillet", "Brussels sprouts", "Cauliflower rice", "Olive oil, salt, pepper"],
        instructions: [
          "Roast Brussels sprouts at 400°F for 20 minutes.",
          "Bake or grill salmon 8-10 minutes.",
          "Heat cauliflower rice in skillet.",
          "Plate together with olive oil drizzle."
        ],
        optionalUpgrade: "Add lemon garlic butter on salmon."
      },
      {
        title: "Sheet Pan Chicken Roast",
        items: ["Chicken thighs", "Zucchini & carrots", "Herbs & olive oil"],
        ingredients: ["Chicken thighs", "Zucchini & carrots", "Olive oil, herbs"],
        instructions: [
          "Preheat oven to 400°F.",
          "Toss chicken and veggies with oil and seasoning.",
          "Spread on sheet pan.",
          "Roast 25-30 minutes until cooked through."
        ],
        optionalUpgrade: "Add potatoes or onions to tray."
      },
      {
        title: "Beef Skillet Bowl",
        items: ["Grass-fed ground beef", "Sautéed spinach & garlic", "Avocado slices"],
        ingredients: ["Grass-fed ground beef", "Spinach & garlic", "Avocado slices"],
        instructions: [
          "Brown beef in skillet with seasoning.",
          "Add garlic and spinach until wilted.",
          "Serve topped with avocado."
        ],
        optionalUpgrade: "Add rice or roasted potatoes."
      },
      {
        title: "Quick Stir-Fry",
        items: ["6oz chicken/shrimp", "Mixed bell peppers", "Coconut aminos"],
        ingredients: ["Chicken or shrimp", "Bell peppers", "Coconut aminos", "Garlic & ginger"],
        instructions: [
          "Cook protein in skillet until done.",
          "Remove protein; sauté peppers.",
          "Return protein to pan.",
          "Add coconut aminos and cook 2-3 minutes."
        ],
        optionalUpgrade: "Serve over rice or cauliflower rice."
      }
    ]
  }
];

export const SHOPPING_LIST: ShoppingCategory[] = [
  {
    title: "Proteins",
    items: [
      "Pasture-raised eggs",
      "Organic chicken (thighs & breasts)",
      "Grass-fed ground beef",
      "Ground turkey",
      "Turkey sausages",
      "Wild-caught salmon",
      "Wild-caught shrimp",
      "Full-fat Greek yogurt",
      "Clean protein powder"
    ]
  },
  {
    title: "Vegetables",
    items: [
      "Mixed greens & spinach",
      "Bell peppers (mixed colors)",
      "Brussels sprouts",
      "Zucchini",
      "Carrots",
      "Cauliflower (or cauliflower rice)",
      "Sweet potatoes",
      "Butter lettuce",
      "Garlic",
      "Ginger",
      "Onions"
    ]
  },
  {
    title: "Fruits",
    items: [
      "Avocados",
      "Lemons",
      "Mixed berries",
      "Apples"
    ]
  },
  {
    title: "Healthy Fats",
    items: [
      "Extra virgin olive oil",
      "Almond butter",
      "Raw walnuts",
      "Mixed nuts & seeds",
      "Chia seeds",
      "Flax seeds"
    ]
  },
  {
    title: "Pantry Staples",
    items: [
      "Almond or coconut milk",
      "Bone broth",
      "Quinoa",
      "Rice (white or brown)",
      "Coconut aminos",
      "Sauerkraut or fermented veggies",
      "Salsa",
      "Guacamole (or make fresh)"
    ]
  },
  {
    title: "Seasonings & Extras",
    items: [
      "Sea salt",
      "Black pepper",
      "Cinnamon",
      "Taco seasoning",
      "Fresh or dried herbs (rosemary, thyme, etc.)",
      "Honey (optional)",
      "Magnesium Glycinate supplement"
    ]
  }
];
