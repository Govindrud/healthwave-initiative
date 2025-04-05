
    </div> <!-- End of content-wrapper -->
    
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <h3>About Us</h3>
                    <p>MeantToHelp provides tools, resources, and services to support your mental well-being journey.</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div class="footer-column">
                    <h3>Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/products">Products</a></li>
                        <li><a href="/doctors">Doctors</a></li>
                        <li><a href="/spirituality">Spirituality</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Services</h3>
                    <ul class="footer-links">
                        <li><a href="/products">Mental Health Products</a></li>
                        <li><a href="/doctors">Professional Consultation</a></li>
                        <li><a href="/spirituality">Spiritual Guidance</a></li>
                        <li><a href="/blog">Mental Health Blog</a></li>
                        <li><a href="/workshops">Workshops</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Contact Us</h3>
                    <ul class="footer-links">
                        <li><i class="fas fa-map-marker-alt"></i> 123 Wellness Street, Health City</li>
                        <li><i class="fas fa-phone"></i> +91 98765 43210</li>
                        <li><i class="fas fa-envelope"></i> info@meanttohelp.com</li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                <p>&copy; <?php echo date('Y'); ?> MeantToHelp. All rights reserved.</p>
            </div>
        </div>
    </footer>
    
    <!-- Toast container for notifications -->
    <div id="toast-container"></div>
    
    <!-- Core JavaScript -->
    <script src="/js/main.js"></script>
    
    <!-- Razorpay Config -->
    <script src="/js/razorpay-config.js"></script>
    
    <!-- Additional JS based on page -->
    <?php if(isset($pageSpecificJS)): ?>
        <?php $jsFiles = explode(',', $pageSpecificJS); ?>
        <?php foreach($jsFiles as $jsFile): ?>
            <script src="/js/<?php echo trim($jsFile); ?>"></script>
        <?php endforeach; ?>
    <?php endif; ?>
</body>
</html>
