# jfast - CMS Full Form - JS Library replace jQuery (Super Fast)
jFast (Like jQuery but Fast Forever)

## Các nhóm hàm chính

### Core / Initialization

#### jFast / $

**Tác dụng:**  
Hàm khởi tạo và truy xuất các phần tử DOM. Có thể sử dụng dưới dạng `jFast(selector)` hoặc `new jFast(selector)`. Hỗ trợ truyền hàm callback để thực thi khi DOM sẵn sàng.

```js
// Ví dụ: Chạy khi DOM đã sẵn sàng
$(document).ready(function() {
  console.log('DOM đã sẵn sàng!');
  // Ví dụ: Truy xuất các phần tử có class "my-class"
  let items = $('.my-class');
});
```

---

### DOM Traversal & Manipulation

#### each

**Tác dụng:**  
Lặp qua các phần tử trong jFast instance và thực thi callback.

```js
// Ví dụ:
$('.item').each(function(el, index) {
  console.log(index, el);
});
```

#### find

**Tác dụng:**  
Tìm kiếm các phần tử con phù hợp với selector bên trong mỗi phần tử của jFast instance.

```js
// Ví dụ:
let listItems = $('#list').find('li');
```

#### eq

**Tác dụng:**  
Trả về jFast instance chứa phần tử tại vị trí index chỉ định.

```js
// Ví dụ:
let firstItem = $('.item').eq(0);
```

#### first

**Tác dụng:**  
Trả về jFast instance chứa phần tử đầu tiên trong tập hợp.

```js
// Ví dụ:
let firstEl = $('.item').first();
```

#### last

**Tác dụng:**  
Trả về jFast instance chứa phần tử cuối cùng trong tập hợp.

```js
// Ví dụ:
let lastEl = $('.item').last();
```

#### parent

**Tác dụng:**  
Lấy phần tử cha trực tiếp của mỗi phần tử trong jFast instance.

```js
// Ví dụ:
let parents = $('.child').parent();
```

#### parents

**Tác dụng:**  
Lấy tất cả các phần tử cha (tổ tiên) của mỗi phần tử trong jFast instance.

```js
// Ví dụ:
let allAncestors = $('.child').parents();
```

#### children

**Tác dụng:**  
Lấy tất cả các phần tử con trực tiếp của mỗi phần tử.

```js
// Ví dụ:
let children = $('.parent').children();
```

#### next

**Tác dụng:**  
Lấy phần tử kế tiếp ngay sau mỗi phần tử trong jFast instance.

```js
// Ví dụ:
let nextSibling = $('.current').next();
```

#### prev

**Tác dụng:**  
Lấy phần tử liền trước của mỗi phần tử trong jFast instance.

```js
// Ví dụ:
let prevSibling = $('.current').prev();
```

#### siblings

**Tác dụng:**  
Lấy tất cả các phần tử anh chị em (siblings) của mỗi phần tử trong jFast instance.

```js
// Ví dụ:
let siblings = $('.current').siblings();
```

#### before

**Tác dụng:**  
Chèn nội dung hoặc phần tử HTML trước mỗi phần tử trong jFast instance.

```js
// Ví dụ:
$('.item').before('<div>Trước item</div>');
```

#### after

**Tác dụng:**  
Chèn nội dung hoặc phần tử HTML sau mỗi phần tử trong jFast instance.

```js
// Ví dụ:
$('.item').after('<div>Sau item</div>');
```

#### append

**Tác dụng:**  
Thêm nội dung hoặc phần tử HTML vào cuối mỗi phần tử trong jFast instance.

```js
// Ví dụ:
$('.container').append('<p>Thêm đoạn văn</p>');
```

#### prepend

**Tác dụng:**  
Thêm nội dung hoặc phần tử HTML vào đầu mỗi phần tử trong jFast instance.

```js
// Ví dụ:
$('.container').prepend('<p>Đoạn văn đầu</p>');
```

#### remove

**Tác dụng:**  
Xóa bỏ các phần tử trong jFast instance khỏi DOM.

```js
// Ví dụ:
$('.remove-me').remove();
```

#### empty

**Tác dụng:**  
Xóa nội dung bên trong (innerHTML) của mỗi phần tử trong jFast instance.

```js
// Ví dụ:
$('.container').empty();
```

---

### CSS & Attributes

#### addClass

**Tác dụng:**  
Thêm class vào các phần tử.

```js
// Ví dụ:
$('.item').addClass('active');
```

#### removeClass

**Tác dụng:**  
Loại bỏ class khỏi các phần tử.

```js
// Ví dụ:
$('.item').removeClass('active');
```

#### toggleClass

**Tác dụng:**  
Chuyển đổi (thêm/xóa) class trên các phần tử. Nếu truyền tham số `state` thì sẽ buộc thêm hoặc xóa theo giá trị boolean.

```js
// Ví dụ:
$('.item').toggleClass('active');
```

#### hasClass

**Tác dụng:**  
Kiểm tra xem phần tử có chứa class được chỉ định hay không.

```js
// Ví dụ:
if ($('.item').hasClass('active')) {
  console.log('Có active');
}
```

#### attr

**Tác dụng:**  
Lấy hoặc đặt thuộc tính (attribute) cho phần tử.

```js
// Ví dụ: Lấy giá trị thuộc tính
let src = $('img').attr('src');

// Ví dụ: Đặt giá trị thuộc tính
$('img').attr('alt', 'Hình ảnh mô tả');
```

#### removeAttr

**Tác dụng:**  
Xóa bỏ thuộc tính khỏi phần tử.

```js
// Ví dụ:
$('input').removeAttr('disabled');
```

#### text

**Tác dụng:**  
Lấy hoặc đặt nội dung văn bản (textContent) của phần tử.

```js
// Ví dụ: Lấy nội dung text
let text = $('.item').text();

// Ví dụ: Đặt nội dung text mới
$('.item').text('Nội dung mới');
```

#### html

**Tác dụng:**  
Lấy hoặc đặt HTML bên trong phần tử.

```js
// Ví dụ: Lấy HTML bên trong
let content = $('.container').html();

// Ví dụ: Đặt HTML mới
$('.container').html('<p>Mã HTML mới</p>');
```

#### data

**Tác dụng:**  
Lấy hoặc đặt giá trị của thuộc tính data-* cho phần tử.

```js
// Ví dụ: Lấy giá trị data
let id = $('.item').data('id');

// Ví dụ: Đặt giá trị data mới
$('.item').data('id', 100);
```

#### css

**Tác dụng:**  
Lấy hoặc đặt các thuộc tính CSS cho phần tử.

```js
// Ví dụ: Lấy giá trị CSS
let color = $('.item').css('color');

// Ví dụ: Đặt thuộc tính CSS
$('.item').css('background-color', 'red');
```

---

### Dimensions & Position

#### width

**Tác dụng:**  
Lấy hoặc đặt chiều rộng của phần tử. Nếu truyền số, tự động thêm đơn vị 'px'.

```js
// Ví dụ: Lấy chiều rộng
let w = $('.box').width();

// Ví dụ: Đặt chiều rộng
$('.box').width(200);
```

#### height

**Tác dụng:**  
Lấy hoặc đặt chiều cao của phần tử. Nếu truyền số, tự động thêm đơn vị 'px'.

```js
// Ví dụ: Lấy chiều cao
let h = $('.box').height();

// Ví dụ: Đặt chiều cao
$('.box').height(150);
```

#### offset

**Tác dụng:**  
Lấy vị trí tuyệt đối của phần tử so với trang (bao gồm scroll).

```js
// Ví dụ:
let pos = $('.box').offset();
console.log(pos.top, pos.left);
```

#### position

**Tác dụng:**  
Lấy vị trí tương đối của phần tử so với phần tử cha gần nhất có vị trí.

```js
// Ví dụ:
let pos = $('.box').position();
console.log(pos.top, pos.left);
```

#### scrollTop

**Tác dụng:**  
Lấy hoặc đặt giá trị scrollTop (vị trí cuộn dọc) của phần tử.

```js
// Ví dụ: Lấy giá trị scrollTop
let scrollPos = $('.container').scrollTop();

// Ví dụ: Đặt giá trị scrollTop
$('.container').scrollTop(100);
```

#### scrollLeft

**Tác dụng:**  
Lấy hoặc đặt giá trị scrollLeft (vị trí cuộn ngang) của phần tử.

```js
// Ví dụ: Lấy giá trị scrollLeft
let scrollLeft = $('.container').scrollLeft();

// Ví dụ: Đặt giá trị scrollLeft
$('.container').scrollLeft(50);
```

---

### Event Handling

#### on

**Tác dụng:**  
Gán sự kiện cho phần tử. Hỗ trợ event delegation nếu truyền thêm selector.

```js
// Ví dụ: Gán sự kiện click
$('.button').on('click', function(e) {
  console.log('Button clicked');
});

// Ví dụ: Sử dụng event delegation (gán sự kiện cho li bên trong ul)
$('ul').on('click', 'li', function(e) {
  console.log('Đã click vào li:', e.delegateTarget);
});
```

#### one

**Tác dụng:**  
Gán sự kiện cho phần tử chỉ thực hiện một lần sau đó tự gỡ bỏ.

```js
// Ví dụ:
$('.button').one('click', function() {
  console.log('Chỉ chạy một lần');
});
```

#### off

**Tác dụng:**  
Gỡ bỏ sự kiện đã gán cho phần tử.

```js
// Ví dụ:
$('.button').off('click');
```

#### trigger

**Tác dụng:**  
Kích hoạt sự kiện cho phần tử, hỗ trợ truyền thêm dữ liệu thông qua CustomEvent.

```js
// Ví dụ:
$('.button').trigger('click');
$('.button').trigger('customEvent', { key: 'value' });
```

#### click, change, keydown, keyup, keypress, mouseover, mouseout, mouseenter, mouseleave

**Tác dụng:**  
Các hàm tiện ích cho các sự kiện thông dụng. Nếu truyền handler thì gán sự kiện, nếu không thì kích hoạt sự kiện.

```js
// Ví dụ: Gán sự kiện click
$('.button').click(function() {
  console.log('Clicked!');
});

// Ví dụ: Gán sự kiện change cho input
$('.input').change(function() {
  console.log('Value changed');
});
```

#### focus

**Tác dụng:**  
Gán hoặc kích hoạt sự kiện focus cho phần tử.

```js
// Ví dụ:
$('.input').focus();
```

#### blur

**Tác dụng:**  
Gán hoặc kích hoạt sự kiện blur cho phần tử.

```js
// Ví dụ:
$('.input').blur();
```

---

### Effects & Animations

#### hide

**Tác dụng:**  
Ẩn các phần tử, có thể kèm hiệu ứng nếu truyền thời gian (duration).

```js
// Ví dụ: Ẩn ngay lập tức
$('.box').hide();

// Ví dụ: Ẩn với hiệu ứng fade trong 400ms
$('.box').hide(400);
```

#### show

**Tác dụng:**  
Hiển thị các phần tử, có thể kèm hiệu ứng nếu truyền thời gian (duration).

```js
// Ví dụ: Hiển thị ngay lập tức
$('.box').show();

// Ví dụ: Hiển thị với hiệu ứng fade trong 400ms
$('.box').show(400);
```

#### toggle

**Tác dụng:**  
Chuyển đổi trạng thái hiển thị (ẩn/hiện) của các phần tử, có thể kèm hiệu ứng.

```js
// Ví dụ:
$('.box').toggle(400);
```

#### fadeIn

**Tác dụng:**  
Hiệu ứng mờ dần hiện lên cho các phần tử.

```js
// Ví dụ:
$('.box').fadeIn(400);
```

#### fadeOut

**Tác dụng:**  
Hiệu ứng mờ dần ẩn đi cho các phần tử.

```js
// Ví dụ:
$('.box').fadeOut(400);
```

#### slideUp

**Tác dụng:**  
Hiệu ứng trượt lên ẩn đi các phần tử.

```js
// Ví dụ:
$('.box').slideUp(400);
```

#### slideDown

**Tác dụng:**  
Hiệu ứng trượt xuống hiện lên các phần tử.

```js
// Ví dụ:
$('.box').slideDown(400);
```

---

### Form Utilities

#### val

**Tác dụng:**  
Lấy hoặc đặt giá trị của các input, select, textarea.

```js
// Ví dụ: Lấy giá trị
let value = $('input').val();

// Ví dụ: Đặt giá trị mới
$('input').val('Giá trị mới');
```

#### prop

**Tác dụng:**  
Lấy hoặc đặt thuộc tính DOM (property) của phần tử.

```js
// Ví dụ: Lấy thuộc tính
let disabled = $('input').prop('disabled');

// Ví dụ: Đặt thuộc tính
$('input').prop('disabled', true);
```

#### serialize

**Tác dụng:**  
Chuyển đổi dữ liệu form thành chuỗi query string.

```js
// Ví dụ:
let query = $('form').serialize();
console.log(query);
```

#### serializeArray

**Tác dụng:**  
Chuyển đổi dữ liệu form thành mảng các cặp key-value.

```js
// Ví dụ:
let dataArray = $('form').serializeArray();
console.log(dataArray);
```

#### submit

**Tác dụng:**  
Kích hoạt sự kiện submit của form, đảm bảo thực thi các kiểm tra của trình duyệt.

```js
// Ví dụ:
$('form').submit();
```

---

### AJAX

#### jFast.ajax

**Tác dụng:**  
Thực hiện các yêu cầu AJAX với các tùy chọn như url, type, dataType, success, error,...

```js
// Ví dụ:
$.ajax({
  url: '/api/data',
  type: 'GET',
  dataType: 'json',
  success: function(response) {
    console.log(response);
  },
  error: function(xhr, status, error) {
    console.error(error);
  }
});
```

---

### Utility Functions

#### jFast.each

**Tác dụng:**  
Lặp qua một collection (mảng hoặc đối tượng giống mảng) và thực thi callback cho từng phần tử.

```js
// Ví dụ:
$.each([1, 2, 3], function(index, value) {
  console.log(index, value);
});
```

#### jFast.map

**Tác dụng:**  
Áp dụng một hàm vào từng phần tử của collection và trả về mảng mới chứa kết quả.

```js
// Ví dụ:
let newArr = $.map([1, 2, 3], function(value) {
  return value * 2;
});
console.log(newArr);
```

#### jFast.grep

**Tác dụng:**  
Lọc một mảng theo điều kiện được xác định bởi callback, trả về mảng mới chứa các phần tử thỏa mãn.

```js
// Ví dụ:
let filtered = $.grep([1, 2, 3, 4], function(value) {
  return value % 2 === 0;
});
console.log(filtered);
```

#### jFast.inArray

**Tác dụng:**  
Kiểm tra xem một giá trị có tồn tại trong mảng hay không. Trả về `true` nếu có, `false` nếu không.

```js
// Ví dụ:
let exists = $.inArray(2, [1, 2, 3]);
console.log(exists); // true nếu có, false nếu không
```
