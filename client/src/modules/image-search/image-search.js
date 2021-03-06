import angular from 'angular';

// imports for this component
import template from './image-search.html';
import './image-search.css';

class ImageSearchController {
  constructor(ImageSearchService) {
    this.ImageSearchService = ImageSearchService;
    this.search = '';
    this.images = [];
    this.spinner = false;
    this.handleTyping = this.handleTyping.bind(this);
  }

  $onInit() {
    this.placeholder = this.placeholder || 'Search for an image';
  }

  handleTyping(event) {
    event.stopPropagation();
    if (event.key === 'Enter') {
      this.imageSearch(this.search);
      event.preventDefault();
    }
  }

  imageSearch(query) {
    this.images = [];
    this.spinner = true;
    this.ImageSearchService.imageSearch(query).then(resp => {
      this.spinner = false;
      this.images = resp;
    });
  }

  imageClick(e) {
    this.imageUrl = e.target.currentSrc;
    $('.search-images img').removeClass('highlight');
    $(e.target).addClass('highlight');
  }
}

ImageSearchController.$inject = ['ImageSearchService'];

const ImageSearchComponent = {
  restrict: 'E',
  bindings: {
    imageUrl: '=',
    placeholder: '@'
  },
  template: template,
  controller: ImageSearchController
};

export default ImageSearchComponent;
