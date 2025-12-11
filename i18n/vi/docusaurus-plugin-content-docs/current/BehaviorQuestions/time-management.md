---
sidebar_position: 8
---

# Quản Lý Thời Gian

Câu hỏi quản lý thời gian đánh giá cách bạn ưu tiên công việc, xử lý các yêu cầu cạnh tranh và giao hàng dưới áp lực.

## Câu Hỏi Phổ Biến

### Q1: Hãy kể cho tôi nghe về một lần bạn phải quản lý nhiều ưu tiên.

**Điều họ tìm kiếm:**
- Cách tiếp cận ưu tiên có hệ thống
- Giao tiếp với các stakeholder
- Giao kết quả bất chấp các yêu cầu cạnh tranh

**Câu Trả Lời Mẫu (STAR):**

> **Situation:** Tôi đang dẫn dắt một bản phát hành tính năng trong khi đồng thời là on-call chính cho các hệ thống production của chúng tôi. Giữa tuần, chúng tôi có hai incident yêu cầu sự chú ý của tôi trong khi tôi có các deliverable cam kết đến thứ Sáu.
>
> **Task:** Tôi cần xử lý các incident, giao tính năng và giao tiếp rõ ràng với tất cả mọi người phụ thuộc vào tôi.
>
> **Action:** Đầu tiên tôi phân loại theo tác động: incident ảnh hưởng đến khách hàng đến trước. Sau khi ổn định production, tôi đánh giá công việc tính năng của mình và xác định phần nào tôi có thể hoàn thành và phần nào cần thêm thời gian. Tôi chủ động nhắn tin cho manager và PM của tôi với timeline cập nhật, giải thích tình hình và đề xuất ship tính năng cốt lõi thứ Sáu với các cải tiến vào thứ Hai tuần sau. Sau đó tôi chặn lịch của mình, từ chối các cuộc họp không thiết yếu và tập trung vào critical path.
>
> **Result:** Các incident được giải quyết mà không có tác động khách hàng. Tính năng cốt lõi ship thứ Sáu, và các cải tiến theo sau vào thứ Hai như kế hoạch. Cả manager và PM của tôi đều đánh giá cao việc giao tiếp chủ động. Tôi học được rằng giao tiếp sớm, trung thực về đánh đổi tốt hơn là hy vọng bạn có thể làm mọi thứ.

---

### Q2: Mô tả một lần bạn phải đáp ứng một deadline gấp.

**Điều họ tìm kiếm:**
- Làm việc hiệu quả dưới áp lực
- Quản lý phạm vi và đánh đổi
- Duy trì chất lượng bất chấp ràng buộc thời gian

**Câu Trả Lời Mẫu (STAR):**

> **Situation:** Một client lớn yêu cầu một tích hợp tùy chỉnh, và sales cam kết deadline hai tuần mà không tham khảo engineering. Công việc thông thường sẽ mất một tháng.
>
> **Task:** Tôi được giao để dẫn dắt tích hợp và cần tìm cách giao điều gì đó có giá trị trong khung thời gian cam kết.
>
> **Action:** Tôi ngay lập tức gặp client để hiểu must-have vs. nice-to-have của họ. Tôi biết được ba trong mười tính năng được yêu cầu thúc đẩy 90% use case của họ. Tôi đề xuất giao ba tính năng đó trong hai tuần, với phần còn lại trong một giai đoạn tiếp theo. Tôi tạo một kế hoạch chi tiết từng ngày, xác định rủi ro trước và thương lượng để có một kỹ sư QA chuyên dụng cho dự án. Tôi cũng thiết lập các cuộc check-in hàng ngày với client để phát hiện vấn đề sớm.
>
> **Result:** Chúng tôi giao tích hợp cốt lõi đúng hạn, và client rất vui—họ có thể bắt đầu sử dụng ngay lập tức. Các tính năng còn lại được giao ba tuần sau đó. Client trở thành một trong những người ủng hộ lớn nhất của chúng tôi. Tôi học được rằng hiểu nhu cầu thực sự đằng sau một yêu cầu thường tiết lộ một con đường nhanh hơn đến giá trị.

---

### Q3: Hãy kể cho tôi nghe về một lần bạn phải nói không hoặc đẩy lùi một yêu cầu.

**Điều họ tìm kiếm:**
- Thiết lập ranh giới phù hợp
- Đẩy lùi chuyên nghiệp với lý do
- Đề xuất các phương án thay thế

**Câu Trả Lời Mẫu (STAR):**

> **Situation:** Một product manager yêu cầu tôi thêm "chỉ một tính năng nữa" vào bản phát hành sắp tới của chúng tôi, hai ngày trước code freeze. Tính năng nhỏ nhưng sẽ yêu cầu thay đổi đến một payment path quan trọng.
>
> **Task:** Tôi cần từ chối yêu cầu theo cách bảo tồn mối quan hệ của chúng tôi và giải thích rủi ro thực sự.
>
> **Action:** Thay vì chỉ nói không, tôi hướng dẫn PM qua các mối quan tâm của tôi: thay đổi đến payment code yêu cầu kiểm thử bổ sung, và hai ngày không đủ cho QA phù hợp. Tôi kéo dữ liệu về các incident trong quá khứ từ các thay đổi payment vội vã. Sau đó tôi đề xuất các phương án thay thế: chúng tôi có thể ship nó trong bản phát hành tiếp theo (hai tuần nữa), hoặc tôi có thể triển khai một feature flag bây giờ và kích hoạt nó sau khi kiểm thử kỹ lưỡng sau khi ra mắt.
>
> **Result:** PM chọn cách tiếp cận feature flag. Tính năng ra mắt một tuần sau bản phát hành với zero vấn đề. PM sau đó nói với tôi họ đánh giá cao việc tôi không chỉ chặn họ mà giúp tìm một giải pháp. Tôi học được rằng "không" hiệu quả hơn khi kết hợp với các phương án thay thế và bằng chứng.

---

### Q4: Mô tả cách bạn ưu tiên công việc của mình khi mọi thứ có vẻ cấp bách.

**Điều họ tìm kiếm:**
- Khung ưu tiên rõ ràng
- Phân biệt cấp bách với quan trọng
- Đưa ra và giao tiếp quyết định

**Câu Trả Lời Mẫu (STAR):**

> **Situation:** Trong một quý áp lực cao, tôi có một tính năng lớn để ship, đang hướng dẫn một người mới, được yêu cầu tham gia phỏng vấn và có một số lỗi production được giao cho tôi. Manager của tôi đang nghỉ phép.
>
> **Task:** Tôi cần tìm ra tập trung vào cái gì và hoãn hoặc ủy thác cái gì.
>
> **Action:** Tôi liệt kê mọi thứ và phân loại theo cấp bách và quan trọng. Lỗi ảnh hưởng khách hàng là cấp bách và quan trọng—tôi giải quyết những cái đó trước. Deadline tính năng cố định, vì vậy tôi chặn thời gian tập trung mỗi ngày cho nó. Tôi tái thương lượng sự tham gia phỏng vấn từ bốn mỗi tuần xuống hai. Đối với hướng dẫn, tôi chuyển từ check-in hàng ngày sang hai lần mỗi tuần, với hỗ trợ async qua Slack. Tôi gửi email cho skip-level manager của tôi giải thích ưu tiên của tôi và yêu cầu họ cho tôi biết nếu tôi sai.
>
> **Result:** Tôi ship tính năng đúng hạn, giải quyết tất cả lỗi nghiêm trọng, và mentee của tôi vẫn đánh giá cao trải nghiệm onboarding. Skip-level đánh giá cao tính minh bạch và xác thực các ưu tiên của tôi. Tôi học được rằng giao tiếp ưu tiên chủ động làm cho các stakeholder liên kết và giảm xung đột bất ngờ.

---

### Q5: Hãy kể cho tôi nghe về một lần bạn bỏ lỡ deadline.

**Điều họ tìm kiếm:**
- Trung thực về thất bại
- Cách bạn xử lý hậu quả
- Bạn đã học và thay đổi gì

**Câu Trả Lời Mẫu (STAR):**

> **Situation:** Tôi cam kết giao một dự án refactoring trong bốn tuần nhưng phát hiện giữa chừng rằng phạm vi lớn hơn tôi ước tính. Tôi bỏ lỡ deadline hai tuần.
>
> **Task:** Tôi cần giao dự án, quản lý kỳ vọng stakeholder và hiểu điều gì đã xảy ra sai trong kế hoạch của tôi.
>
> **Action:** Ngay khi tôi nhận ra sự chậm trễ có khả năng xảy ra, tôi đã giao tiếp nó—không phải khi tôi bỏ lỡ deadline. Tôi giải thích những gì tôi phát hiện, đưa ra timeline mới thực tế và đề nghị điều chỉnh phạm vi nếu deadline ban đầu là quan trọng. Tôi hoàn thành dự án với thời gian bổ sung. Sau đó, tôi thực hiện một hồi tưởng cá nhân: Tôi đã ước tính dựa trên "happy path" mà không tính đến độ phức tạp của legacy code mà tôi phát hiện.
>
> **Result:** Dự án được giao muộn hai tuần nhưng với chất lượng cao. Các stakeholder thất vọng nhưng đánh giá cao cảnh báo sớm. Bây giờ tôi xây dựng thời gian khám phá cho các dự án refactoring và thực hiện một technical spike trước khi cam kết timeline. Tôi đã không bỏ lỡ deadline kể từ khi triển khai thực hành này.

---

## Chủ Đề Chính Cần Thể Hiện

| Chủ Đề | Cách Thể Hiện |
|-------|----------------|
| **Ưu Tiên** | Khung rõ ràng để quyết định cái gì đến trước |
| **Giao Tiếp** | Cập nhật chủ động khi timeline thay đổi |
| **Tập Trung** | Khả năng chặn thời gian và tránh phân tâm |
| **Đánh Đổi** | Đưa ra quyết định phạm vi thông minh |
| **Ranh Giới** | Nói không một cách chuyên nghiệp khi cần thiết |

## Khung Ưu Tiên

Khi được hỏi cách bạn ưu tiên, thể hiện một cách tiếp cận rõ ràng:

1. **Cấp Bách** - Cái gì có deadline cứng hoặc tác động ngay lập tức?
2. **Quan Trọng** - Cái gì có giá trị hoặc rủi ro cao nhất?
3. **Phụ Thuộc** - Cái gì chặn người khác hoặc bị chặn bởi người khác?
4. **Nỗ Lực** - Các chiến thắng nhanh có thể giải phóng thời gian cho các task lớn hơn không?

**Ma Trận Eisenhower:**
| | Cấp Bách | Không Cấp Bách |
|---|--------|------------|
| **Quan Trọng** | Làm Trước | Lên Lịch |
| **Không Quan Trọng** | Ủy Thác | Loại Bỏ |

## Câu Chuyện Cần Chuẩn Bị

Chuẩn bị ít nhất 2-3 câu chuyện thể hiện:

- [ ] Quản lý các ưu tiên cạnh tranh
- [ ] Giao hàng dưới một deadline gấp
- [ ] Đẩy lùi các yêu cầu không hợp lý
- [ ] Cách tiếp cận của bạn đối với ưu tiên
- [ ] Xử lý một deadline bỏ lỡ một cách chuyên nghiệp
