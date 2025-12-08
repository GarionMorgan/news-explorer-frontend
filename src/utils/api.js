const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

// Mock data storage (in real app, this would be handled by backend)
let mockUsers = [];
let currentUser = null;
let savedArticles = [];

// Authentication API functions (with mock implementation for development)
export const signUp = async (userData) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user already exists (mock validation)
    const userExists = mockUsers.find((user) => user.email === userData.email);
    if (userExists) {
      console.error("Registration failed: User already exists");
      return { success: false, error: "User with this email already exists" };
    }

    // Create new user (mock response)
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      createdAt: new Date().toISOString(),
    };

    mockUsers.push({ ...newUser, password: userData.password });
    console.log("User registered successfully:", newUser);
    return { success: true, data: newUser };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: error.message || "Network error occurred during registration",
    };
  } finally {
    console.log("Registration request completed");
  }
};

export const signIn = async (credentials) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find user in mock storage
    const user = mockUsers.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      // Create user data without password
      currentUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      };

      console.log("User signed in successfully:", currentUser);
      return { success: true, data: currentUser };
    } else {
      console.error("Sign in failed: Invalid credentials");
      return { success: false, error: "Invalid email or password" };
    }
  } catch (error) {
    console.error("Sign in error:", error);
    return {
      success: false,
      error: error.message || "Network error occurred during sign in",
    };
  } finally {
    console.log("Sign in request completed");
  }
};

export const signOut = async () => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Clear current user (mock sign out)
    currentUser = null;
    console.log("User signed out successfully");
    return { success: true };
  } catch (error) {
    console.error("Sign out error:", error);
    return {
      success: false,
      error: error.message || "Network error occurred during sign out",
    };
  } finally {
    console.log("Sign out request completed");
  }
};

// Helper function to get current user (for testing)
export const getCurrentUser = () => currentUser;

// Article saving/liking API functions (with mock implementation for development)
export const saveArticle = async (articleData) => {
  try {
    if (!currentUser) {
      return {
        success: false,
        error: "User must be logged in to save articles",
      };
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Create saved article object
    const savedArticle = {
      id: Date.now(),
      userId: currentUser.id,
      url: articleData.url,
      title: articleData.title,
      description: articleData.description,
      publishedAt: articleData.publishedAt,
      source: articleData.source,
      urlToImage: articleData.urlToImage,
      keyword: articleData.keyword || "general", // Search keyword used to find this article
      savedAt: new Date().toISOString(),
    };

    // Check if article is already saved by this user
    const existingSave = savedArticles.find(
      (save) => save.userId === currentUser.id && save.url === articleData.url
    );

    if (existingSave) {
      console.log("Article already saved by user");
      return { success: false, error: "Article already saved" };
    }

    // Add to saved articles
    savedArticles.push(savedArticle);
    console.log("Article saved successfully:", savedArticle);
    return { success: true, data: savedArticle };
  } catch (error) {
    console.error("Save article error:", error);
    return {
      success: false,
      error: error.message || "Failed to save article",
    };
  } finally {
    console.log("Save article request completed");
  }
};

export const unsaveArticle = async (articleUrl) => {
  try {
    if (!currentUser) {
      return { success: false, error: "User must be logged in" };
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Find and remove the saved article
    const articleIndex = savedArticles.findIndex(
      (save) => save.userId === currentUser.id && save.url === articleUrl
    );

    if (articleIndex === -1) {
      return { success: false, error: "Article not found in saved articles" };
    }

    const removedArticle = savedArticles.splice(articleIndex, 1)[0];
    console.log("Article unsaved successfully:", removedArticle);
    return { success: true, data: removedArticle };
  } catch (error) {
    console.error("Unsave article error:", error);
    return {
      success: false,
      error: error.message || "Failed to unsave article",
    };
  } finally {
    console.log("Unsave article request completed");
  }
};

export const getSavedArticles = async () => {
  try {
    if (!currentUser) {
      return { success: false, error: "User must be logged in" };
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Get all articles saved by current user
    const userSavedArticles = savedArticles.filter(
      (save) => save.userId === currentUser.id
    );

    console.log("Retrieved saved articles:", userSavedArticles);
    return { success: true, data: userSavedArticles };
  } catch (error) {
    console.error("Get saved articles error:", error);
    return {
      success: false,
      error: error.message || "Failed to retrieve saved articles",
    };
  } finally {
    console.log("Get saved articles request completed");
  }
};

export const isArticleSaved = (articleUrl) => {
  if (!currentUser) return false;

  return savedArticles.some(
    (save) => save.userId === currentUser.id && save.url === articleUrl
  );
};

// Helper function to get saved articles count for current user
export const getSavedArticlesCount = () => {
  if (!currentUser) return 0;

  return savedArticles.filter((save) => save.userId === currentUser.id).length;
};

export default newsApiBaseUrl;
