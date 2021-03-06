<?php

/**
 * REST API logic for posts.
 */
final class FL_Assistant_REST_Posts {

	/**
	 * Register routes.
	 */
	static public function register_routes() {
		register_rest_route(
			FL_Assistant_REST::$namespace, '/posts', array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => __CLASS__ . '::posts',
					'permission_callback' => function() {
						return current_user_can( 'edit_published_posts' );
					},
				),
			)
		);

		register_rest_route(
			FL_Assistant_REST::$namespace, '/posts/hierarchical', array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => __CLASS__ . '::hierarchical_posts',
					'permission_callback' => function() {
						return current_user_can( 'edit_published_posts' );
					},
				),
			)
		);

		register_rest_route(
			FL_Assistant_REST::$namespace, '/posts/count', array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => __CLASS__ . '::posts_count',
					'permission_callback' => function() {
						return current_user_can( 'edit_published_posts' );
					},
				),
			)
		);

		register_rest_route(
			FL_Assistant_REST::$namespace, '/post/(?P<id>\d+)', array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => __CLASS__ . '::post',
					'args'                => array(
						'id' => array(
							'required' => true,
							'type'     => 'number',
						),
					),
					'permission_callback' => function() {
						return current_user_can( 'edit_published_posts' );
					},
				),
				array(
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => __CLASS__ . '::update_post',
					'args'                => array(
						'id'     => array(
							'required' => true,
							'type'     => 'number',
						),
						'action' => array(
							'required' => true,
							'type'     => 'string',
						),
					),
					'permission_callback' => function() {
						return current_user_can( 'edit_published_posts' );
					},
				),
			)
		);

		register_rest_route(
			FL_Assistant_REST::$namespace, '/post', array(
				array(
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => __CLASS__ . '::create_post',
					'permission_callback' => function() {
						return current_user_can( 'edit_published_posts' );
					},
				),
			)
		);
	}

	/**
	 * Returns an array of response data for a single post.
	 */
	static public function get_post_response_data( $post ) {
		$author = get_the_author_meta( 'display_name', $post->post_author );
		$date = get_the_date( '', $post );
		$response = array(
			'author'          => $author,
			'commentsAllowed' => 'open' === $post->comment_status ? true : false,
			'content'         => $post->post_content,
			'excerpt'         => $post->post_excerpt,
			'date'            => $date,
			'editUrl'         => get_edit_post_link( $post->ID, '' ),
			'id'              => $post->ID,
			'meta'            => $author . ' - ' . $date,
			'parent'          => $post->post_parent,
			'slug'            => $post->post_name,
			'status'          => $post->post_status,
			'thumbnail'       => get_the_post_thumbnail_url( $post, 'thumbnail' ),
			'title'           => empty( $post->post_title ) ? __( '(no title)', 'fl-assistant' ) : $post->post_title,
			'type'            => $post->post_type,
			'url'             => get_permalink( $post ),
			'visibility'      => __( 'Public', 'fl-assistant' ),
		);

		// Post visibility.
		if ( 'private' === $post->post_status ) {
			$response['visibility'] = __( 'Private', 'fl-assistant' );
		} elseif ( ! empty( $post->post_password ) ) {
			$response['visibility'] = __( 'Password Protected', 'fl-assistant' );
		}

		// Beaver Builder data.
		if ( class_exists( 'FLBuilderModel' ) ) {
			$response['bbCanEdit']   = FL_Assistant_Data::bb_can_edit_post( $post->ID );
			$response['bbIsEnabled'] = FLBuilderModel::is_builder_enabled( $post->ID );
			$response['bbBranding']  = FLBuilderModel::get_branding();
			$response['bbEditUrl']   = FLBuilderModel::get_edit_url( $post->ID );
		}

		return $response;
	}

	/**
	 * Returns an array of posts and related data.
	 */
	static public function posts( $request ) {
		$response = array();
		$params   = $request->get_params();
		$posts    = get_posts( $params );

		foreach ( $posts as $post ) {
			if ( current_user_can( 'edit_post', $post->ID ) ) {
				$response[] = self::get_post_response_data( $post );
			}
		}

		return rest_ensure_response( $response );
	}

	/**
	 * Returns an array of posts and related data
	 * with child posts contained in the parent
	 * post's data array.
	 */
	static public function hierarchical_posts( $request ) {
		$response = array();
		$children = array();
		$params   = $request->get_params();
		$posts    = get_posts(
			array_merge(
				$params, array(
					'perm' => 'editable',
				)
			)
		);

		foreach ( $posts as $post ) {
			if ( $post->post_parent ) {
				if ( ! isset( $children[ $post->post_parent ] ) ) {
					$children[ $post->post_parent ] = array();
				}
				$children[ $post->post_parent ][] = $post;
			}
		}

		foreach ( $posts as $post ) {
			if ( ! $post->post_parent ) {
				$parent = self::get_post_response_data( $post );
				$parent['children'] = self::get_child_posts( $post, $children );
				$response[] = $parent;
			}
		}

		return rest_ensure_response( $response );
	}

	/**
	 * Returns an array of child posts for the given post.
	 * A $children array must be passed to search for children.
	 */
	static public function get_child_posts( $post, $children ) {
		if ( isset( $children[ $post->ID ] ) ) {
			$post_children = $children[ $post->ID ];
			foreach ( $post_children as $i => $child ) {
				$post_children[ $i ] = self::get_post_response_data( $child );
				$post_children[ $i ]['children'] = self::get_child_posts( $child, $children );
			}
			return $post_children;
		}
		return array();
	}

	/**
	 * Returns an array of counts by post type.
	 */
	static public function posts_count( $request ) {
		$post_types = FL_Assistant_Data::get_post_types();
		$response = array();

		foreach ( $post_types as $slug => $label ) {
			$counts = wp_count_posts( $slug );
			$counts->total = $counts->publish + $counts->draft + $counts->pending + $counts->private + $counts->future;
			$response[ $slug ] = $counts;
		}

		return rest_ensure_response( $response );
	}

	/**
	 * Returns data for a single post.
	 */
	static public function post( $request ) {
		$id = $request->get_param( 'id' );

		if ( current_user_can( 'edit_post', $id ) ) {
			$post = get_post( $id );
			return self::get_post_response_data( $post );
		}

		return array();
	}

	/**
	 * Creates a single post.
	 */
	static public function create_post( $request ) {
		$id = wp_insert_post( $request->get_params() );

		if ( ! $id || is_wp_error( $id ) ) {
			return array(
				'error' => true,
			);
		}

		return self::get_post_response_data( get_post( $id ) );
	}

	/**
	 * Updates a single post based on the specified action.
	 */
	static public function update_post( $request ) {
		$id     = $request->get_param( 'id' );
		$action = $request->get_param( 'action' );

		if ( ! current_user_can( 'edit_post', $id ) ) {
			return rest_ensure_response(
				array(
					'error' => true,
				)
			);
		}

		switch ( $action ) {
			case 'data':
				$data = (array) json_decode( $request->get_param( 'data' ) );
				wp_update_post(
					array_merge(
						$data, array(
							'ID' => $id,
						)
					)
				);
				break;
			case 'trash':
				if ( ! EMPTY_TRASH_DAYS ) {
					wp_delete_post( $id );
				} else {
					wp_trash_post( $id );
				}
				break;
			case 'untrash':
				wp_untrash_post( $id );
				break;
		}

		return rest_ensure_response(
			array(
				'success' => true,
			)
		);
	}
}

FL_Assistant_REST_Posts::register_routes();
