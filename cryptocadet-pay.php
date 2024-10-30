<?php
/**
 * Plugin Name: CryptoCadet
 * Description: A lightweight, no-code payment processor that uses blockchain to reduce processing time from days to just seconds.
 * Version: 4.0.0
 * Author: Ascendant Finance
 * License: GPLv2 or later
 */

  // Register and enqueue your JavaScript file
function cryptocadet_pay_enqueue_scripts() {
    wp_enqueue_script('cryptocadet-pay-script', plugins_url('./main.js', __FILE__), array('jquery'), '1.0', true);

    // Now, prepare to pass the PHP variables into that JavaScript file
    $script_data = array(
        'apiKey' => get_option('cryptocadet_pay_api_key') // Retrieve the apiKey value from WP settings
    );
    

    // Pass the data to main.js. 'cryptocadetSettings' is the object name that will be used in JS
    wp_localize_script('cryptocadet-pay-script', 'cryptocadetSettings', $script_data);

     // Enqueue the CSS styles
     wp_enqueue_style('cryptocadet-pay-style', plugins_url('styles.css', __FILE__), array(), '1.0', 'all');

}
add_action('wp_enqueue_scripts', 'cryptocadet_pay_enqueue_scripts');

// Optional: Add plugin settings for customization
// This part can be expanded based on specific requirements for customization.
function cryptocadet_pay_register_settings() {
    // Register a new setting for "api_url" and "button_text"
    register_setting('general', 'cryptocadet_pay_api_key');

    // Add a new section to the "General" settings page
    add_settings_section('cryptocadet_pay_settings_section', 'CryptoCadet Pay Plugin Settings', 'cryptocadet_pay_settings_section_callback', 'general');

    // Add new fields to the new section
    add_settings_field('cryptocadet_pay_api_key', 'API KEY', 'cryptocadet_pay_settings_field_callback', 'general', 'cryptocadet_pay_settings_section', array('label_for' => 'cryptocadet_pay_api_key'));
}
add_action('admin_init', 'cryptocadet_pay_register_settings');

function cryptocadet_pay_settings_section_callback() {
    echo '<p>Enter your settings below:</p>';
}

function cryptocadet_pay_settings_field_callback($args) {
    $option = get_option($args['label_for']);
    echo "<input id='" . esc_attr($args['label_for']) . "' name='" . esc_attr($args['label_for']) . "' type='text' value='" . esc_attr($option) . "' />";
}

function cryptocadet_pay_shortcode_handler($atts = [], $content = null, $tag = '') {
    // Normalize attribute keys, lowercase
    $atts = array_change_key_case((array)$atts, CASE_LOWER);

    // Default attributes for the shortcode
    $cryptocadet_atts = shortcode_atts([
        'container_id' => 'cryptocadet-pay-container', // Default container ID
        'product_id' => '', // Default to no product ID
        'label' => 'Pay with Crypto',
        'display_name' => '',
        'style' => '',
        'cart_style' => '',
        'email' => '',
        'shipping_address' => '',
        'lang' => 'en',
        'eth' => 'true',
        'sol' => 'false',
        'shopping_cart' => 'false',
        'no_quantity' => 'false'
    ], $atts, $tag);

    // Use the attributes in the output
    $output = '<div id="' . esc_attr($cryptocadet_atts['container_id']) . '" data-product-id="' . esc_attr($cryptocadet_atts['product_id']) . '" label="' . esc_attr($cryptocadet_atts['label']) . '" display-name="' . esc_attr($cryptocadet_atts['display_name']) . '" style="' . esc_attr($cryptocadet_atts['style']) . '" cart-style="' . esc_attr($cryptocadet_atts['cart_style']) . '" email="' . esc_attr($cryptocadet_atts['email']) . '" shipping-address="' . esc_attr($cryptocadet_atts['shipping_address']) . '" lang="' . esc_attr($cryptocadet_atts['lang']) . '" eth="' . esc_attr($cryptocadet_atts['eth']) . '" sol="' . esc_attr($cryptocadet_atts['sol']) . '" shopping-cart="' . esc_attr($cryptocadet_atts['shopping_cart']) . '" no-quantity="' . esc_attr($cryptocadet_atts['no_quantity']) . '">';
    $output .= '</div>';

    return $output;
}

// Register the shortcode with WordPress
function cryptocadet_pay_register_shortcode() {
    add_shortcode('crypto_pay_button', 'cryptocadet_pay_shortcode_handler');
}

add_action('init', 'cryptocadet_pay_register_shortcode');

