
export const options =  { 
    totalItems: '',
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
    totalPages:"",
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton: type => {
            let template = '';
        
            if (type.type === 'first') {
              template =
              '<a href="#" class=" tui-page-btn tui-first custom-class-first">' +
              '<span class="tui-ico-first">1</span>' +
          '</a>';
            }
            if (type.type === 'prev') {
                template =
                '<a href="#" class="arrow tui-page-btn tui-prev custom-class-prev tui-first-child">' +'<span class="material-icons">arrow_back</span>' 
                +
            '</a>';
              }

              if (type.type === 'next') {
                template =
                '<a href="#" class="arrow tui-page-btn tui-next custom-class-next">' +
                '<span class="material-icons">arrow_forward</span>' +
            '</a>';
              }

              if (type.type === 'last') {
                template =
                '<a href="#" class=" tui-page-btn tui-last custom-class-last">' +
                '<span class="tui-ico-last">'+ options.totalPages +'</span>' +
            '</a>';
              }
        
            return template;
          },
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