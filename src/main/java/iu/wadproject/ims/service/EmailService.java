package iu.wadproject.ims.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendResetPasswordEmail(String toEmail, String uuid) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("Inventory Management System <email_cua_ban@gmail.com>");
            helper.setTo(toEmail);
            helper.setSubject("[IMS] request reset password");

            String htmlContent = "<h3>Inventory Management System (IMS)</h3>"
                    + "<p>You have requested to reset your password. Your verification code (UUID) is:</p>"
                    + "<div style='padding:10px; background:#f0f0f0; font-family:monospace; font-size:16px; font-weight:bold; display:inline-block;'>"
                    + uuid + "</div>"
                    + "<p>This code is valid for 15 minutes.</p>";

            helper.setText(htmlContent, true); 
            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi gửi email: " + e.getMessage());
        }
    }
}