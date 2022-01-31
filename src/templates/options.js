export const options =  { 
    totalItems: '',
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
    
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
        '<a href="#" class=" tui-page-btn tui-{{type}} custom-class-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
    '</a>',
        disabledMoveButton:
            '<span class=" visually-hidden tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</span>',
        moreButton:
            '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
                '<span class="tui-ico-ellip">...</span>' +
            '</a>'      
    }
}