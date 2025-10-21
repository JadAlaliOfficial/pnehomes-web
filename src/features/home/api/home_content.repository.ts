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
   * Get first section data
   */
  public getFirstSection() {
    return this.homeContent["first-section"];
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
   * Get grid section data
   */
  public getGridSection() {
    return this.homeContent["grid-section"];
  }

  /**
   * Get testimonials data
   */
  public getTestimonials() {
    return this.homeContent.testimonials;
  }

  /**
   * Get contact section data
   */
  public getContact() {
    return this.homeContent.contact;
  }

  /**
   * Get main video from first section
   */
  public getMainVideo() {
    return this.homeContent["first-section"].video;
  }

  /**
   * Get logo from first section
   */
  public getLogo() {
    return this.homeContent["first-section"].logo;
  }

  /**
   * Get main title and subtitle from first section
   */
  public getMainTitle() {
    return {
      title: this.homeContent["first-section"].title,
      subtitle: this.homeContent["first-section"].subtitle
    };
  }

  /**
   * Get book button from first section
   */
  public getBookButton() {
    return this.homeContent["first-section"]["book-button"];
  }

  /**
   * Check if book button exists and is not null or empty
   */
  public hasBookButton(): boolean {
    const bookButton = this.homeContent["first-section"]["book-button"];
    return bookButton !== null && bookButton !== "";
  }

  /**
   * Check if first section subtitle exists and is not null or empty
   */
  public hasFirstSectionSubtitle(): boolean {
    const subtitle = this.homeContent["first-section"].subtitle;
    return subtitle !== null && subtitle !== "";
  }

  /**
   * Check if hero subtitle exists and is not null or empty
   */
  public hasHeroSubtitle(): boolean {
    const subtitle = this.homeContent.hero.subtitle;
    return subtitle !== null && subtitle !== "";
  }

  /**
   * Check if services description exists and is not null or empty
   */
  public hasServicesDescription(): boolean {
    const description = this.homeContent.services.description;
    return description !== null && description !== "";
  }

  /**
   * Get cover for mobile from first section
   */
  public getCoverForMobile() {
    return this.homeContent["first-section"]["cover-for-mobile"];
  }

  /**
   * Get services cover
   */
  public getServicesCover() {
    return this.homeContent.services.cover;
  }

  /**
   * Update home content data (for future use)
   */
  public updateHomeContent(newContent: Partial<HomeContent>): void {
    this.homeContent = { ...this.homeContent, ...newContent };
  }
}