// Common components - Re-exports from presentational for backward compatibility
// Only ErrorBoundary remains here as it's a functional component, not purely visual

export { default as ErrorBoundary } from './ErrorBoundary';
export { default as SlideTransition } from './SlideTransition';

// Re-exports from presentational (for backward compatibility)
export { AnimatedText, MarkdownText } from '../presentational/typography';
export { GitHubLink, LanguageToggle } from '../presentational/buttons';
export { ImageCarousel } from '../presentational/media';
// Export Container as the default Header to maintain backward compatibility with business logic
export { default as Header } from '../containers/HeaderContainer';
