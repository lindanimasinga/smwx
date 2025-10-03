# SMWX Angular Application

## Overview

This project is a fast, mobile-first web application for SMWX podcast content. It allows users to browse, search, and share episodes and clips, with a focus on a great mobile and offline experience.

## Implemented Features

### Core

*   **Standalone Components:** The entire application is built with Angular's standalone components, directives, and pipes.
*   **Modern Control Flow:** Utilizes `@if`, `@for`, and `@switch` for cleaner template logic.
*   **OnPush Change Detection:** All components use `ChangeDetectionStrategy.OnPush` for optimal performance.

### Styling

*   **Bootstrap:** The application is styled using Bootstrap for a responsive and consistent look and feel.
*   **Custom Styling:** The `episode-detail` component has custom styles for a clean presentation of the episode information.

### PWA

*   **Service Worker:** A service worker is implemented to enable offline capabilities and improve performance.
*   **Web App Manifest:** The application includes a web app manifest to allow users to install it on their devices.

### Data

*   **RSS Parsing:** An `RssService` is implemented to fetch and parse a YouTube RSS feed into `Episode` and `PlaylistItem` data models.

### UI

*   **Video Player:** A `VideoPlayerComponent` is implemented to embed and control the YouTube video player.
*   **Playlist:** A `PlaylistComponent` is implemented to display a list of videos that the user can select to play.
*   **Episode Detail:** An `EpisodeDetailComponent` displays the title and description of the selected video.
*   **Main App:** The main `AppComponent` is updated to use the `VideoPlayerComponent`, `PlaylistComponent` and `EpisodeDetailComponent` to display the video playlist and details.
