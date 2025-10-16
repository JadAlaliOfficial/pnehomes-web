import { HomeLayout } from '../model/types';
import homeLayoutData from '../mock/home_layout.json';

export class HomeLayoutRepository {
  private static instance: HomeLayoutRepository;
  private homeLayout: HomeLayout;

  private constructor() {
    this.homeLayout = homeLayoutData as HomeLayout;
  }

  public static getInstance(): HomeLayoutRepository {
    if (!HomeLayoutRepository.instance) {
      HomeLayoutRepository.instance = new HomeLayoutRepository();
    }
    return HomeLayoutRepository.instance;
  }

  /**
   * Get the complete home layout data
   */
  public getHomeLayout(): HomeLayout {
    return this.homeLayout;
  }

  /**
   * Get header configuration
   */
  public getHeaderConfig() {
    return {
      logo: this.homeLayout['header-logo'],
      navigation: this.homeLayout['header-nav'],
      button: this.homeLayout['header-button'],
      phone: this.homeLayout['header-phone']
    };
  }

  /**
   * Get footer configuration
   */
  public getFooterConfig() {
    return {
      navigation: this.homeLayout['footer-nav'],
      phone: this.homeLayout['footer-phone'],
      social: this.homeLayout['footer-social']
    };
  }

  /**
   * Get navigation items for header
   */
  public getHeaderNavigation() {
    return this.homeLayout['header-nav'];
  }

  /**
   * Get navigation items for footer
   */
  public getFooterNavigation() {
    return this.homeLayout['footer-nav'];
  }

  /**
   * Get social media links
   */
  public getSocialMediaLinks() {
    return this.homeLayout['footer-social'];
  }

  /**
   * Get contact phone number
   */
  public getContactPhone() {
    return this.homeLayout['header-phone'];
  }

  /**
   * Update home layout data (for future use)
   */
  public updateHomeLayout(newLayout: Partial<HomeLayout>): void {
    this.homeLayout = { ...this.homeLayout, ...newLayout };
  }
}