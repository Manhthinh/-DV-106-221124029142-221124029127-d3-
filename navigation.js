document.addEventListener('DOMContentLoaded', function() {
    const totalCharts = 12; // Tổng số chart
    const navContainerId = 'global-navigation'; // ID của div chứa thanh điều hướng

    // Tìm div container trong HTML
    const navContainer = document.getElementById(navContainerId);
    if (!navContainer) {
        console.error(`Không tìm thấy phần tử với ID "${navContainerId}" để chèn thanh điều hướng.`);
        return;
    }

    // Xác định trang hiện tại để làm nổi bật nút tương ứng
    const currentPagePath = window.location.pathname;
    // Lấy tên file. Nếu path là '/' hoặc '/folder/', coi như là index.html
    let currentPageFilename = currentPagePath.substring(currentPagePath.lastIndexOf('/') + 1);
    if (currentPageFilename === '' || currentPageFilename === '/') {
        currentPageFilename = 'index.html';
    }

    let currentPageNumber = 0;

    // ---- THAY ĐỔI 1: Xác định số trang hiện tại ----
    // Ưu tiên kiểm tra 'index.html' trước
    if (currentPageFilename.toLowerCase() === 'index.html') {
        currentPageNumber = 1;
    } else {
        // Nếu không phải index.html, thử khớp với mẫu Q<số>.html
        const match = currentPageFilename.match(/Q(\d+)\.html/i);
        if (match && match[1]) {
            currentPageNumber = parseInt(match[1], 10);
            // Đảm bảo rằng số trang từ Qx.html không phải là 1 (vì 1 dành cho index.html)
            // Hoặc bạn có thể để nguyên nếu cấu trúc file thực sự là Q1.html, Q2.html,...
            // và chỉ muốn link đầu tiên trỏ đến index.html.
            // Quyết định này phụ thuộc vào cấu trúc file thực tế của bạn.
            // Giả sử Q1.html không tồn tại và bạn bắt đầu từ Q2.html cho các trang khác.
            // if (currentPageNumber === 1) {
            //    console.warn("Phát hiện Q1.html, nhưng trang 1 được dành cho index.html.");
            //    currentPageNumber = 0; // Không highlight gì cả hoặc xử lý khác
            // }
        } else {
            console.warn("Không thể xác định số trang hiện tại từ tên file:", currentPageFilename);
        }
    }
    // ---- KẾT THÚC THAY ĐỔI 1 ----

    // Tạo HTML cho các nút
    let navHTML = '';
    for (let i = 1; i <= totalCharts; i++) {
        const isActive = (i === currentPageNumber);
        const activeClass = isActive ? ' active' : ''; // Thêm class 'active' nếu là trang hiện tại

        // ---- THAY ĐỔI 2: Tạo tên file đích ----
        // Nếu i là 1, trỏ đến index.html, ngược lại trỏ đến Q<i>.html
        const fileName = (i === 1) ? 'index.html' : `Q${i}.html`;
        // ---- KẾT THÚC THAY ĐỔI 2 ----

        navHTML += `<a href="${fileName}" class="nav-button${activeClass}">${i}</a>`;
    }

    // Chèn HTML vào container
    navContainer.innerHTML = navHTML;

});