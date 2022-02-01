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
        moveButton: '<a href="#" class=" tui-page-btn tui-{{type}} custom-class-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>', 
        
        
        // type => {
        //     let template = '<a href="#" class=" tui-page-btn tui-{{type}} custom-class-{{type}}">' +
        //     '<span class="tui-ico-{{type}}">{{type}}</span>' +
        // '</a>';
        
        //     if (type.type === 'first') {
        //       template =
        //       '<a href="#" class=" tui-page-btn tui-first custom-class-first">' +
        //       '<span class="tui-ico-first">1</span>' +
        //   '</a>';
        //     }
        //     if (type.type === 'prev') {
        //         template =
        //         '<a href="#" class=" tui-page-btn tui-first custom-class-first">' +
        //         '<svg class="pagination__icon" width="16" height="16">'+
        //             '<use href="http://www.w3.org/2000/svg"></use>'+
        //         '</svg>' +
        //     '</a>';
        //       }

        //     //   if (type.type === 'first') {
        //     //     template =
        //     //     '<a href="#" class=" tui-page-btn tui-first custom-class-first">' +
        //     //     '<span class="tui-ico-first">1</span>' +
        //     // '</a>';
        //     //   }

        //     //   if (type.type === 'first') {
        //     //     template =
        //     //     '<a href="#" class=" tui-page-btn tui-first custom-class-first">' +
        //     //     '<span class="tui-ico-first">1</span>' +
        //     // '</a>';
        //     //   }
        
        //     return template;
        //   },
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