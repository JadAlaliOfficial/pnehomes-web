import { HomeContent } from '../model/home_content.types';
import homeContentData from '../mock/home.json';

export class HomeContentRepository {
  private static instance: HomeContentRepository;
  private homeContent: HomeContent;

  private constructor() {
    this.homeContent = homeContentData as HomeContent;
  }

  public static getInstance(): HomeContentRepository {
    if (!HomeContentRepository.instance) {
      HomeContentRepository.instance = new HomeContentRepository();
    }
    return HomeContentRepository.instance;
  }

  /**
   * Get the complete home content data
   */
  public getHomeContent(): HomeContent {
    return this.homeContent;
  }

  /**
   * Get hero section data
   */
  public getHero() {
    return this.homeContent.hero;
  }

  /**
   * Get services section data
   */
  public getServices() {
    return this.homeContent.services;
  }

  /**
   * Get links section data
   */
  public getLinks() {
    return this.homeContent.links;
  }

  /**
   * Get testimonials data
   */
  public getTestimonials() {
    return this.homeContent.testemonials;
  }

  /**
   * Get contact section data
   */
  public getContact() {
    return this.homeContent.contact;
  }

  /**
   * Get main video
   */
  public getMainVideo() {
    return this.homeContent.video;
  }

  /**
   * Get logo
   */
  public getLogo() {
    return this.homeContent.logo;
  }

  /**
   * Get main title and subtitle
   */
  public getMainTitle() {
    return {
      title: this.homeContent.title,
      subtitle: this.homeContent.subtitle
    };
  }

  /**
   * Get book button
   */
  public getBookButton() {
    return this.homeContent["book-button"];
  }

  /**
   * Update home content data (for future use)
   */
  public updateHomeContent(newContent: Partial<HomeContent>): void {
    this.homeContent = { ...this.homeContent, ...newContent };
  }
}