
    </main>
    
    <!-- Footer -->
    <footer class="site-footer">
        <div class="footer-top">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-about">
                        <div class="footer-logo">
                            <img src="<?php echo SITE_URL; ?>/images/logo.png" alt="<?php echo SITE_NAME; ?>" onerror="this.src='<?php echo SITE_URL; ?>/images/logo-placeholder.png'; this.onerror=null;">
                            <span><?php echo SITE_NAME; ?></span>
                        </div>
                        <p>Dedicated to supporting your mental wellbeing journey through holistic approaches, professional guidance, and quality resources.</p>
                        <div class="social-links">
                            <a href="#" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                            <a href="#" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    
                    <div class="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="<?php echo SITE_URL; ?>">Home</a></li>
                            <li><a href="<?php echo SITE_URL; ?>/doctors.php">Doctors</a></li>
                            <li><a href="<?php echo SITE_URL; ?>/spirituality.php">Spirituality</a></li>
                            <li><a href="<?php echo SITE_URL; ?>/products.php">Products</a></li>
                            <li><a href="<?php echo SITE_URL; ?>/contact.php">Contact</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-links">
                        <h3>Services</h3>
                        <ul>
                            <li><a href="<?php echo SITE_URL; ?>/doctors.php">Doctor Consultations</a></li>
                            <li><a href="<?php echo SITE_URL; ?>/spirituality.php#priests-tab">Spiritual Guidance</a></li>
                            <li><a href="<?php echo SITE_URL; ?>/spirituality.php#tours-tab">Sacred Tours</a></li>
                            <li><a href="#">Student Counseling</a></li>
                            <li><a href="#">Corporate Wellness</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-newsletter">
                        <h3>Subscribe to Our Newsletter</h3>
                        <p>Stay updated with our latest news and special offers.</p>
                        <form class="newsletter-form">
                            <input type="email" placeholder="Your email address" required>
                            <button type="submit"><i class="fas fa-paper-plane"></i></button>
                        </form>
                        <div class="payment-methods">
                            <span>We accept:</span>
                            <div class="payment-icons">
                                <i class="fab fa-cc-visa"></i>
                                <i class="fab fa-cc-mastercard"></i>
                                <i class="fab fa-cc-amex"></i>
                                <i class="fab fa-cc-paypal"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer-bottom">
            <div class="container">
                <div class="copyright">
                    <p>&copy; <?php echo date('Y'); ?> <?php echo SITE_NAME; ?>. All Rights Reserved.</p>
                </div>
                <div class="footer-bottom-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Refund Policy</a>
                </div>
            </div>
        </div>
    </footer>
    
    <!-- Back to Top Button -->
    <a href="#" class="back-to-top">
        <i class="fas fa-arrow-up"></i>
    </a>
    
    <!-- Main JS -->
    <script src="<?php echo SITE_URL; ?>/js/main.js"></script>
    
    <?php if (isset($pageSpecificJS)): ?>
    <!-- Page Specific JS -->
    <script src="<?php echo SITE_URL; ?>/js/<?php echo $pageSpecificJS; ?>"></script>
    <?php endif; ?>
</body>
</html>
