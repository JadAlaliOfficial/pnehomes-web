import { Community, CommunityFilter, PropertyFilter, FloorPlan } from './types';

export class CommunitySelector {
  /**
   * Filter communities by name and/or city
   */
  filterCommunities(communities: Community[], filters: CommunityFilter): Community[] {
    return communities.filter(community => {
      let matches = true;

      // Filter by community name
      if (filters.name) {
        matches = matches && community.title.toLowerCase().includes(filters.name.toLowerCase());
      }

      // Filter by city
      if (filters.city) {
        matches = matches && community.city.toLowerCase().includes(filters.city.toLowerCase());
      }

      return matches;
    });
  }

  /**
   * Filter properties within a community based on bedrooms, baths, and price
   */
  filterProperties(community: Community, filters: PropertyFilter): Community {
    const filteredFloorPlans = community['floor-plans'].filter(floorPlan => {
      let matches = true;

      // Filter by bedrooms
      if (filters.minBedrooms !== undefined) {
        matches = matches && parseInt(floorPlan.beds) >= filters.minBedrooms;
      }
      if (filters.maxBedrooms !== undefined) {
        matches = matches && parseInt(floorPlan.beds) <= filters.maxBedrooms;
      }

      // Filter by bathrooms
      if (filters.minBaths !== undefined) {
        matches = matches && parseFloat(floorPlan.baths) >= filters.minBaths;
      }
      if (filters.maxBaths !== undefined) {
        matches = matches && parseFloat(floorPlan.baths) <= filters.maxBaths;
      }

      // Filter by price
      if (filters.minPrice !== undefined) {
        matches = matches && parseInt(floorPlan.price) >= filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        matches = matches && parseInt(floorPlan.price) <= filters.maxPrice;
      }

      return matches;
    });

    return {
      ...community,
      'floor-plans': filteredFloorPlans
    };
  }

  /**
   * Get unique values for filter options
   */
  getFilterOptions(communities: Community[]) {
    const cities = [...new Set(communities.map(c => c.city))];
    
    const allFloorPlans = communities.flatMap(c => c['floor-plans']);
    const bedrooms = [...new Set(allFloorPlans.map(fp => parseInt(fp.beds)))].sort((a, b) => a - b);
    const bathrooms = [...new Set(allFloorPlans.map(fp => parseFloat(fp.baths)))].sort((a, b) => a - b);
    
    const prices = allFloorPlans.map(fp => parseInt(fp.price)).sort((a, b) => a - b);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return {
      cities,
      bedrooms,
      bathrooms,
      priceRange: { min: minPrice, max: maxPrice }
    };
  }

  /**
   * Search floor plans across all communities
   */
  searchFloorPlans(communities: Community[], filters: PropertyFilter): FloorPlan[] {
    const allFloorPlans = communities.flatMap(c => c['floor-plans']);
    
    return allFloorPlans.filter(floorPlan => {
      let matches = true;

      // Filter by bedrooms
      if (filters.minBedrooms !== undefined) {
        matches = matches && parseInt(floorPlan.beds) >= filters.minBedrooms;
      }
      if (filters.maxBedrooms !== undefined) {
        matches = matches && parseInt(floorPlan.beds) <= filters.maxBedrooms;
      }

      // Filter by bathrooms
      if (filters.minBaths !== undefined) {
        matches = matches && parseFloat(floorPlan.baths) >= filters.minBaths;
      }
      if (filters.maxBaths !== undefined) {
        matches = matches && parseFloat(floorPlan.baths) <= filters.maxBaths;
      }

      // Filter by price
      if (filters.minPrice !== undefined) {
        matches = matches && parseInt(floorPlan.price) >= filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        matches = matches && parseInt(floorPlan.price) <= filters.maxPrice;
      }

      return matches;
    });
  }

  /**
   * Sort communities by various criteria
   */
  sortCommunities(communities: Community[], sortBy: 'name' | 'city' | 'price', order: 'asc' | 'desc' = 'asc'): Community[] {
    return [...communities].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'city':
          comparison = a.city.localeCompare(b.city);
          break;
        case 'price':
          const aPrice = parseInt(a['starting-price'].replace(/[^0-9]/g, ''));
          const bPrice = parseInt(b['starting-price'].replace(/[^0-9]/g, ''));
          comparison = aPrice - bPrice;
          break;
      }

      return order === 'desc' ? -comparison : comparison;
    });
  }
}