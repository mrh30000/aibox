import * as hbs from 'hbs';

interface PaginationData {
    currentPage: number;
    totalPages: number;
    limit: number; // Though not directly used in link generation here, useful for context
}

interface PaginationOptions {
    hash: { // For parameters passed like {{myHelper param1="value1" param2="value2"}}
        baseUrl?: string;
        pageParamName?: string;
        limitParamName?: string; // Not used in this version but good for future
        maxPagesToShow?: number;
    };
    // For data passed as context like {{#myHelper paginationData}} or {{{myHelper paginationData}}}
    // data?: any;
}

export function registerPaginationHelper() {
    hbs.registerHelper('renderPagination', function (pagination: PaginationData, options: PaginationOptions) {
        if (!pagination || pagination.totalPages <= 1) {
            return '';
        }

        const { currentPage, totalPages } = pagination;
        const baseUrl = options.hash.baseUrl || '';
        const pageParamName = options.hash.pageParamName || 'page';
        // const limitParamName = options.hash.limitParamName || 'limit'; // For future use if limit is also in query
        const maxPagesToShow = options.hash.maxPagesToShow || 5; // Number of page links to show around current

        let html = '<ul class="mcp-pagination-list">'; // Changed class for clarity
        const pageWindowHalf = Math.floor(maxPagesToShow / 2);

        // Previous Page Link
        if (currentPage > 1) {
            html += `<li><a href="${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${pageParamName}=${currentPage - 1}" aria-label="Previous Page">Previous</a></li>`;
        } else {
            html += `<li class="disabled"><span>Previous</span></li>`;
        }

        // Page Number Links
        let startPage = Math.max(1, currentPage - pageWindowHalf);
        let endPage = Math.min(totalPages, currentPage + pageWindowHalf);

        if (currentPage - pageWindowHalf <= 0) {
            endPage = Math.min(totalPages, maxPagesToShow);
        }
        if (currentPage + pageWindowHalf >= totalPages) {
            startPage = Math.max(1, totalPages - maxPagesToShow + 1);
        }

        // First page and ellipsis if needed
        if (startPage > 1) {
            html += `<li><a href="${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${pageParamName}=1">1</a></li>`;
            if (startPage > 2) {
                 html += `<li class="disabled"><span>...</span></li>`;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            if (i === currentPage) {
                html += `<li class="current-page"><span>${i}</span></li>`;
            } else {
                html += `<li><a href="${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${pageParamName}=${i}">${i}</a></li>`;
            }
        }

        // Last page and ellipsis if needed
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                html += `<li class="disabled"><span>...</span></li>`;
            }
            html += `<li><a href="${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${pageParamName}=${totalPages}">${totalPages}</a></li>`;
        }


        // Next Page Link
        if (currentPage < totalPages) {
            html += `<li><a href="${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${pageParamName}=${currentPage + 1}" aria-label="Next Page">Next</a></li>`;
        } else {
            html += `<li class="disabled"><span>Next</span></li>`;
        }

        html += '</ul>';
        return new hbs.SafeString(html);
    });
}
