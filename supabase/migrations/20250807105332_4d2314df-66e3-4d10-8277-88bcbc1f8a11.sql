-- Add Vietnamese sections for individual benefit cards and other content
INSERT INTO careers_content (language_code, section_key, title, content, display_order, is_active) VALUES
-- Individual benefit cards for Vietnamese  
('vi', 'benefit_friendly_environment_title', 'Thẻ Quyền lợi', 'Môi trường làm việc thân thiện', 10, true),
('vi', 'benefit_friendly_environment_content', 'Nội dung Thẻ Quyền lợi', 'Đội ngũ đồng nghiệp hỗ trợ, môi trường làm việc tích cực và văn hóa công ty mạnh mẽ.', 11, true),
('vi', 'benefit_career_development_title', 'Thẻ Quyền lợi', 'Phát triển nghề nghiệp', 12, true),
('vi', 'benefit_career_development_content', 'Nội dung Thẻ Quyền lợi', 'Cơ hội đào tạo, học hỏi và thăng tiến rõ ràng trong sự nghiệp của bạn.', 13, true),
('vi', 'benefit_achievements_title', 'Thẻ Quyền lợi', 'Thành tựu và thành công', 14, true),
('vi', 'benefit_achievements_content', 'Nội dung Thẻ Quyền lợi', 'Được ghi nhận những đóng góp và thành tựu trong công việc.', 15, true),
('vi', 'benefit_healthcare_title', 'Thẻ Quyền lợi', 'Chăm sóc sức khỏe', 16, true),
('vi', 'benefit_healthcare_content', 'Nội dung Thẻ Quyền lợi', 'Bảo hiểm y tế toàn diện, khám sức khỏe định kỳ và hỗ trợ chăm sóc sức khỏe.', 17, true),
('vi', 'benefit_flexible_time_title', 'Thẻ Quyền lợi', 'Thời gian linh hoạt', 18, true),
('vi', 'benefit_flexible_time_content', 'Nội dung Thẻ Quyền lợi', 'Chế độ làm việc linh hoạt, nghỉ phép hợp lý và cân bằng cuộc sống.', 19, true),
('vi', 'benefit_attractive_salary_title', 'Thẻ Quyền lợi', 'Lương thưởng hấp dẫn', 20, true),
('vi', 'benefit_attractive_salary_content', 'Nội dung Thẻ Quyền lợi', 'Mức lương cạnh tranh, thưởng hiệu suất và các phúc lợi bổ sung.', 21, true),
('vi', 'benefit_skill_development_title', 'Thẻ Quyền lợi', 'Phát triển kỹ năng', 22, true),
('vi', 'benefit_skill_development_content', 'Nội dung Thẻ Quyền lợi', 'Các khóa đào tạo chuyên môn, hội thảo và cơ hội học tập liên tục.', 23, true),
-- Job section titles
('vi', 'jobs_section_title', 'Phần Tuyển dụng', 'Vị trí đang tuyển dụng', 30, true),
('vi', 'jobs_section_subtitle', 'Phần Tuyển dụng', 'Khám phá những cơ hội nghề nghiệp phù hợp với bạn', 31, true),
-- Contact section
('vi', 'contact_section_title', 'Phần Liên hệ', 'Không tìm thấy vị trí phù hợp?', 40, true),
('vi', 'contact_section_content', 'Phần Liên hệ', 'Hãy gửi CV của bạn đến chúng tôi. Chúng tôi sẽ liên hệ khi có vị trí phù hợp với năng lực và kinh nghiệm của bạn.', 41, true),
('vi', 'contact_email_label', 'Liên hệ', 'Email:', 42, true),
('vi', 'contact_hotline_label', 'Liên hệ', 'Hotline:', 43, true),
-- Labels and buttons
('vi', 'apply_now_button', 'Nút bấm', 'Ứng tuyển ngay', 50, true),
('vi', 'job_description_label', 'Nhãn', 'Mô tả công việc', 51, true),
('vi', 'job_requirements_label', 'Nhãn', 'Yêu cầu ứng viên', 52, true),
('vi', 'experience_label', 'Nhãn', 'Kinh nghiệm:', 53, true),
('vi', 'deadline_label', 'Nhãn', 'Hạn nộp hồ sơ:', 54, true),
('vi', 'no_jobs_title', 'Nhãn', 'Hiện tại chưa có vị trí tuyển dụng', 55, true),
('vi', 'no_jobs_content', 'Nhãn', 'Vui lòng quay lại sau để xem các cơ hội nghề nghiệp mới', 56, true),
('vi', 'back_to_home', 'Điều hướng', 'Quay lại trang chủ', 57, true)
ON CONFLICT (section_key, language_code) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  display_order = EXCLUDED.display_order;