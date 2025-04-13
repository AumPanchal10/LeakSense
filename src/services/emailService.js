import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_kongkjv';
const EMAILJS_TEMPLATE_ID = 'template_b6319e4';

export const sendEmail = async (formData) => {
  try {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      throw new Error('All fields are required');
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: 'LeakSense Team'
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (!response || response.status !== 200) {
      console.error('Email service response:', response);
      throw new Error('Failed to send email: Invalid response from email service');
    }

    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send message. Please try again.' };
  }
};