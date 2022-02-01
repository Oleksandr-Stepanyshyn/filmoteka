
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
        moveButton:
        //  '<a href="#" class=" tui-page-btn tui-{{type}} custom-class-{{type}}">' +
        //     '<span class="tui-ico-{{type}}">{{type}}</span>' +
        // '</a>', 
        
        
        type => {
            let template = '';
        
            if (type.type === 'first') {
              template =
              '<a href="#" class=" tui-page-btn tui-first custom-class-first">' +
              '<span class="tui-ico-first">1</span>' +
          '</a>';
            }
            if (type.type === 'prev') {
                template =
                '<a href="#" class=" tui-page-btn tui-prev custom-class-prev tui-first-child">' +'<span class="tui-ico-first"><i class="fas fa-arrow-left"></span>'
                // '<svg class="tui-ico-prev" width="16" height="16">'+
                //     '<use href="http://www.w3.org/2000/svg"></use>'+
                // '</svg>' 
                +
            '</a>';
              }

              if (type.type === 'next') {
                template =
                '<a href="#" class=" tui-page-btn tui-next custom-class-next">' +
                '<span class="tui-ico-next"><i class="fas fa-arrow-right"></i></span>' +
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