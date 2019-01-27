<?php

/**
 * Handles enqueuing css and js assets for the UI
 * in addition to setup of the initial frontend data.
 *
 * @since 0.1
 */
class FL_Assistant_Asset_Loader {

    /**
     * Initialize the backend application.
     *
     * @since 0.1
     * @return void
     */
    static public function init() {
        add_action( 'wp_enqueue_scripts', __CLASS__ . '::enqueue' );
    }

    /**
     * Enqueue frontend resources - fired on wp_enqueue_scripts action.
     *
     * @since 0.1
     * @return void
     */
    static public function enqueue() {

        if ( self::should_enqueue() ) {
            wp_enqueue_script( 'fl-assistant-utils', FL_ASSISTANT_URL . 'build/utils.bundle.js', array(), FL_ASSISTANT_VERSION, true );

            wp_enqueue_script( 'fl-assistant-front', FL_ASSISTANT_URL . 'build/front.bundle.js', array(), FL_ASSISTANT_VERSION, true );
            wp_enqueue_style( 'fl-assistant-front', FL_ASSISTANT_URL . 'build/front.bundle.css', array(), FL_ASSISTANT_VERSION, null );

            wp_localize_script( 'fl-assistant-front', 'FLAssistantInitialData', FL_Assistant_Initial_Data::get() );
        }
    }

    /**
     * Check if the frontend scripts/styles should be enqueued
     *
     * @since 0.1
     * @return Bool
     */
    static public function should_enqueue() {

        $should_enqueue = true;

        if ( ! is_user_logged_in() || is_customize_preview() ) {
            $should_enqueue = false;
        }

        // If Beaver Builder is active, don't enqueue
        if ( class_exists( 'FLBuilderModel' ) ) {
            if ( FLBuilderModel::is_builder_active() || FLBuilderModel::is_builder_draft_preview() ) {
                $should_enqueue = false;
            }
        }
        return $should_enqueue;
    }
}

FL_Assistant_Asset_Loader::init();
