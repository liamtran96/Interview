---
sidebar_position: 7
---

# Giải Quyết Vấn Đề

Câu hỏi giải quyết vấn đề đánh giá tư duy phân tích, sự sáng tạo và cách tiếp cận của bạn đối với các thách thức phức tạp.

## Câu Hỏi Phổ Biến

### Q1: Hãy kể cho tôi nghe về một vấn đề phức tạp bạn đã giải quyết.

**Điều họ tìm kiếm:**
- Cách tiếp cận phân tích để chia nhỏ vấn đề
- Sáng tạo trong việc tìm giải pháp
- Khả năng làm việc qua sự mơ hồ

**Câu Trả Lời Mẫu (STAR):**

> **Situation:** Ứng dụng của chúng tôi có các vấn đề hiệu suất không liên tục chỉ xuất hiện trong production và ảnh hưởng đến người dùng ngẫu nhiên. Log không hiển thị pattern rõ ràng, và vấn đề đã tồn tại hàng tháng mà không giải quyết được.
>
> **Task:** Tôi tình nguyện điều tra và tìm nguyên nhân gốc rễ đã khiến nhiều kỹ sư bối rối.
>
> **Action:** Tôi bắt đầu bằng việc thu thập tất cả dữ liệu có sẵn: log, số liệu, báo cáo người dùng và tương quan thời gian. Khi phân tích ban đầu không hiển thị pattern, tôi thêm instrumentation chi tiết hơn vào production. Sau hai tuần thu thập dữ liệu, tôi nhận thấy vấn đề tương quan với cạn kiệt connection pool database cụ thể. Tôi truy vết nó đến một lỗi tinh vi nơi connection không được giải phóng trong các điều kiện lỗi nhất định. Lỗi chỉ kích hoạt với một chuỗi request cụ thể hiếm nhưng không ngẫu nhiên.
>
> **Result:** Bản sửa lỗi là một thay đổi code ba dòng. Phương sai thời gian phản hồi giảm 90%, và chúng tôi loại bỏ hàng trăm ticket hỗ trợ mỗi tháng. Tôi document cách tiếp cận debugging và tạo một runbook cho các điều tra tương tự. Tôi học được rằng các vấn đề "ngẫu nhiên" thường có pattern ẩn—chìa khóa là thu thập đủ dữ liệu để tìm chúng.

---

### Q2: Mô tả một lần bạn phải học điều gì đó nhanh chóng để giải quyết một vấn đề.

**Điều họ tìm kiếm:**
- Khả năng học nhanh
- Tháo vát
- Áp dụng kiến thức mới hiệu quả

**Câu Trả Lời Mẫu (STAR):**

> **Situation:** Chúng tôi có một lỗi nghiêm trọng trong caching hình ảnh của app mobile, nhưng developer mobile của chúng tôi vừa rời đi và tôi chủ yếu là một kỹ sư backend không có kinh nghiệm iOS.
>
> **Task:** Tôi cần chẩn đoán và sửa vấn đề trước bản phát hành app store tiếp theo của chúng tôi trong ba ngày.
>
> **Action:** Tôi dành ngày đầu tiên học cơ bản: cách caching iOS hoạt động, kiến trúc app của chúng tôi và thư viện hình ảnh cụ thể chúng tôi sử dụng. Tôi đọc source code của thư viện trên GitHub và tìm thấy các cuộc thảo luận về các vấn đề tương tự. Đến ngày hai, tôi đã thu hẹp nó xuống một race condition trong lớp caching tùy chỉnh của chúng tôi. Tôi viết một bản sửa, sau đó tìm một developer iOS trên team khác có thể review code của tôi vì tôi không tự tin về best practice iOS. Tôi cũng viết test để xác minh bản sửa.
>
> **Result:** Bản sửa ship đúng hạn và giải quyết vấn đề hoàn toàn. Kinh nghiệm cho tôi tự tin để xử lý các vấn đề cross-platform. Kể từ đó tôi đã trở thành người được tìm đến cho các vấn đề caching trên tất cả các nền tảng. Tôi học được rằng chuyên môn sâu trong một lĩnh vực chuyển giao nhiều hơn tôi mong đợi—kỹ năng debugging và hiểu biết về hệ thống áp dụng ở khắp mọi nơi.

---

### Q3: Hãy kể cho tôi nghe về một lần bạn cải thiện một quy trình hoặc hệ thống hiện có.

**Điều họ tìm kiếm:**
- Chủ động cải thiện hiện trạng
- Tư duy hệ thống
- Đo lường tác động

**Câu Trả Lời Mẫu (STAR):**

> **Situation:** Quy trình code review của chúng tôi là một bottleneck—PR thường ngồi 2-3 ngày chờ review, làm chậm velocity của toàn bộ team.
>
> **Task:** Tôi muốn tìm cách giảm thời gian review mà không làm giảm chất lượng hoặc làm quá tải bất kỳ ai.
>
> **Action:** Đầu tiên, tôi phân tích dữ liệu: kích thước PR, thời gian review, ai đang review cái gì. Tôi phát hiện PR lớn mất thời gian không tương xứng lâu hơn, và một vài thành viên team đang làm hầu hết review. Tôi đề xuất một số thay đổi: giới hạn kích thước PR 400 dòng, một hệ thống luân phiên cho review và một "giờ review" hàng ngày nơi mọi người tập trung vào xóa hàng đợi. Tôi tạo dashboard để theo dõi số liệu và làm cho sự cải thiện rõ ràng.
>
> **Result:** Thời gian review trung bình giảm từ 2.5 ngày xuống 6 giờ. Số lượng reviewer tham gia tăng, lan tỏa kiến thức trên team. Chúng tôi cũng phát hiện nhiều lỗi hơn vì PR nhỏ hơn dễ review cẩn thận hơn. Cách tiếp cận được áp dụng bởi hai team khác trong công ty.

---

### Q4: Mô tả một tình huống mà bạn phải giải quyết một vấn đề với thông tin hạn chế.

**Điều họ tìm kiếm:**
- Thoải mái với sự mơ hồ
- Cách tiếp cận dựa trên giả thuyết
- Biết khi nào hành động vs. thu thập thêm thông tin

**Câu Trả Lời Mẫu (STAR):**

> **Situation:** Một client quan trọng báo cáo rằng "app cảm thấy chậm," nhưng họ không thể cụ thể hơn. Kiểm thử nội bộ của chúng tôi cho thấy mọi thứ đều ổn, và chúng tôi không có quyền truy cập vào môi trường của họ.
>
> **Task:** Tôi cần chẩn đoán vấn đề từ xa chỉ với các triệu chứng mơ hồ để làm việc.
>
> **Action:** Tôi bắt đầu bằng việc đặt câu hỏi làm rõ để thu hẹp không gian vấn đề: tính năng nào, thời gian nào trong ngày, bao nhiêu người dùng bị ảnh hưởng. Tôi biết được nó chủ yếu là tính năng xuất dữ liệu của họ. Tôi đưa ra giả thuyết về một số nguyên nhân: khối lượng dữ liệu của họ, vấn đề mạng hoặc xử lý batch của chúng tôi. Tôi xây dựng một công cụ chẩn đoán đơn giản họ có thể chạy sẽ đo thời gian chính và gửi kết quả cho chúng tôi. Dữ liệu tiết lộ rằng xuất hoạt động tốt cho đến khi họ vượt quá 10.000 hàng, lúc đó việc sử dụng bộ nhớ tăng đột biến.
>
> **Result:** Tôi phát hiện chúng tôi đang tải tất cả hàng vào bộ nhớ trước khi streaming. Bản sửa là triển khai streaming thực sự, mà tôi ship trong vòng một tuần. Thời gian xuất giảm từ phút xuống giây cho các dataset lớn. Công cụ chẩn đoán tôi xây dựng trở thành một phần của toolkit hỗ trợ của chúng tôi cho các vấn đề tương tự. Tôi học được rằng khi thông tin bị hạn chế, đầu tư vào việc thu thập dữ liệu đúng thường nhanh hơn đoán.

---

### Q5: Hãy kể cho tôi nghe về một lần bạn xác định một vấn đề trước khi nó trở nên nghiêm trọng.

**Điều họ tìm kiếm:**
- Tư duy chủ động
- Chú ý đến các dấu hiệu cảnh báo
- Ngăn chặn vấn đề vs. chỉ sửa chúng

**Câu Trả Lời Mẫu (STAR):**

> **Situation:** Trong khi review số liệu database của chúng tôi cho một task không liên quan, tôi nhận thấy tốc độ tăng trưởng bảng user của chúng tôi đang tăng tốc. Ở tốc độ hiện tại, chúng tôi sẽ vượt quá dung lượng database của mình trong khoảng ba tháng.
>
> **Task:** Tôi cần xác thực mối quan tâm của mình và nêu ra trước khi nó trở thành khẩn cấp.
>
> **Action:** Tôi xây dựng một mô hình dự đoán cho thấy khi chúng tôi sẽ đạt đến dung lượng trong các kịch bản tăng trưởng khác nhau. Tôi nghiên cứu giải pháp: sharding database, lưu trữ dữ liệu cũ hoặc nâng cấp phần cứng. Tôi chuẩn bị một document ngắn gọn phác thảo vấn đề, timeline và các lựa chọn với đánh đổi. Tôi trình bày điều này cho manager và team database của tôi, đóng khung nó như "đây là điều gì đó tôi nhận thấy mà chúng ta có thể muốn lên kế hoạch."
>
> **Result:** Chúng tôi triển khai một chiến lược lưu trữ cho chúng tôi 2 năm runway với một phần chi phí của việc mở rộng database. Migration diễn ra trong một cửa sổ bảo trì đã lên kế hoạch với zero downtime. Manager của tôi đặc biệt gọi tên việc xác định chủ động này trong đánh giá của tôi. Bây giờ tôi thường xuyên lên lịch các cuộc "system health review" để phát hiện các xu hướng tương tự sớm.

---

## Chủ Đề Chính Cần Thể Hiện

| Chủ Đề | Cách Thể Hiện |
|-------|----------------|
| **Tư Duy Phân Tích** | Chia nhỏ các vấn đề phức tạp thành các thành phần |
| **Sáng Tạo** | Tìm giải pháp không rõ ràng |
| **Kiên Trì** | Không bỏ cuộc khi các cách tiếp cận ban đầu thất bại |
| **Dựa Trên Dữ Liệu** | Sử dụng bằng chứng để hướng dẫn quyết định |
| **Chủ Động** | Tìm vấn đề trước khi chúng tìm bạn |

## Khung Giải Quyết Vấn Đề

Khi đối mặt với một vấn đề, thể hiện cách tiếp cận này:

1. **Hiểu** - Làm rõ vấn đề và tác động của nó
2. **Phân Tích** - Chia nhỏ nó và thu thập dữ liệu
3. **Đưa Ra Giả Thuyết** - Hình thành lý thuyết về nguyên nhân gốc rễ
4. **Kiểm Tra** - Xác thực giả thuyết với bằng chứng
5. **Giải Quyết** - Triển khai và xác minh giải pháp
6. **Ngăn Chặn** - Đảm bảo nó không xảy ra lần nữa

## Câu Chuyện Cần Chuẩn Bị

Chuẩn bị ít nhất 2-3 câu chuyện thể hiện:

- [ ] Giải quyết một vấn đề kỹ thuật phức tạp
- [ ] Học nhanh để giải quyết một thách thức
- [ ] Cải thiện một quy trình hoặc hệ thống hiện có
- [ ] Đưa ra quyết định với thông tin không đầy đủ
- [ ] Xác định và ngăn chặn các vấn đề tiềm ẩn
