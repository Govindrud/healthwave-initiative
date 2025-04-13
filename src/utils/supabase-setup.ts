
import { supabase } from "@/lib/supabase";

/**
 * This utility script will create the necessary tables in Supabase
 * Run this function once to initialize the database schema
 */
export async function setupTables() {
  console.log("Setting up Supabase tables...");

  try {
    // Create products table using SQL directly
    const { error: productsError } = await supabase
      .rpc('exec', { 
        query: `SELECT create_products_table();` 
      });
    
    if (productsError) {
      if (productsError.message.includes('already exists')) {
        console.log("Products table already exists, skipping creation");
      } else {
        console.error("Error creating products table:", productsError);
      }
    } else {
      console.log("Products table created successfully");
    }

    // Add sample product data
    if (!productsError || productsError.message.includes('already exists')) {
      await addSampleProducts();
    }

    console.log("Database setup complete!");
    return { success: true };

  } catch (error) {
    console.error("Failed to set up database:", error);
    return { success: false, error };
  }
}

async function addSampleProducts() {
  // Check if we already have products to avoid duplicates
  const { data: existingProducts } = await supabase.from('products').select('id').limit(1);
  
  if (existingProducts && existingProducts.length > 0) {
    console.log("Sample products already exist, skipping seeding");
    return;
  }
  
  const sampleProducts = [
    {
      name: "Meditation Cushion",
      description: "Ergonomically designed meditation cushion for comfort during long meditation sessions. Made with organic materials and filled with natural buckwheat hulls for optimal support.",
      short_description: "Comfortable cushion for meditation practice",
      price: 1499,
      image: "/images/products/meditation-cushion.jpg",
      category: "meditation",
      featured: true,
      stock: 25
    },
    {
      name: "Weighted Blanket",
      description: "Premium weighted blanket designed to reduce anxiety and improve sleep quality. The gentle pressure promotes relaxation and helps calm the nervous system.",
      short_description: "Helps reduce anxiety and improve sleep",
      price: 3999,
      image: "/images/products/weighted-blanket.jpg",
      category: "sleep",
      featured: true,
      stock: 15
    },
    {
      name: "Anxiety Relief Stones",
      description: "Set of 5 smooth worry stones made from natural materials. Hold and rub these stones during moments of anxiety to help ground yourself and reduce stress.",
      short_description: "Natural stones for stress reduction",
      price: 899,
      image: "/images/products/anxiety-stones.jpg",
      category: "anxiety",
      featured: false,
      stock: 40
    },
    {
      name: "White Noise Sound Machine",
      description: "Compact sound machine with 10 soothing sounds to mask disruptive noises. Perfect for creating a peaceful environment for sleep, meditation, or focus.",
      short_description: "Creates peaceful environment for better sleep",
      price: 1799,
      image: "/images/products/sound-machine.jpg",
      category: "sleep",
      featured: true,
      stock: 20
    },
    {
      name: "Aromatherapy Diffuser",
      description: "Modern ultrasonic diffuser that disperses essential oils into the air. Features color-changing LED lights and auto-shutoff functionality.",
      short_description: "Disperse calming oils into your space",
      price: 2499,
      image: "/images/products/aromatherapy-diffuser.jpg",
      category: "stress",
      featured: false,
      stock: 30
    },
    {
      name: "Productivity Journal",
      description: "Structured journal with prompts designed to increase focus, productivity, and mental clarity. Includes goal-setting frameworks and reflection exercises.",
      short_description: "Structured journal for mental clarity",
      price: 1299,
      image: "/images/products/productivity-journal.jpg",
      category: "focus",
      featured: false,
      stock: 50
    },
    {
      name: "Sleep Mask with Headphones",
      description: "Comfortable sleep mask with built-in Bluetooth headphones. Block light and listen to guided meditations or calming sounds to help you fall asleep.",
      short_description: "Block light and listen to calming sounds",
      price: 2299,
      image: "/images/products/sleep-mask.jpg",
      category: "sleep",
      featured: false,
      stock: 35
    },
    {
      name: "Self-Care Box",
      description: "Monthly subscription box filled with products to promote mental wellness. Each box contains 5-7 items focused on self-care and stress reduction.",
      short_description: "Monthly box for mental wellness",
      price: 2999,
      image: "/images/products/selfcare-box.jpg",
      category: "selfcare",
      featured: true,
      stock: 10
    }
  ];

  const { error } = await supabase.from('products').insert(sampleProducts);
  
  if (error) {
    console.error("Error adding sample products:", error);
  } else {
    console.log("Sample products added successfully");
  }
}
