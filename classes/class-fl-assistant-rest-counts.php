<?php

/**
 * REST API logic for content count data.
 */
final class FL_Assistant_REST_Counts {

	/**
	 * Register routes.
	 */
	static public function register_routes() {
		register_rest_route(
			FL_Assistant_REST::$namespace, '/counts', array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => __CLASS__ . '::all',
					'permission_callback' => function() {
						return is_user_logged_in();
					},
				),
			)
		);
	}

	/**
	 * Returns all counts for the site.
	 */
	static public function all( $request ) {
		$routes = array(
			'/fl-assistant/v1/notifications/count' => function( $response ) {
				return array(
					'notifications/comments' => $response['comments'],
					'notifications/updates'  => $response['updates'],
					'notifications/total'    => $response['total'],
				);
			},
			'/fl-assistant/v1/posts/count'         => function( $response ) {
				$return = array();
				foreach ( $response as $post_type => $data ) {
					$return[ 'content/' . $post_type ] = $data->total;
				}
				return $return;
			},
			'/fl-assistant/v1/terms/count'         => function( $response ) {
				$return = array();
				foreach ( $response as $taxonomy => $count ) {
					$return[ 'taxonomy/' . $taxonomy ] = $count;
				}
				return $return;
			},
			'/fl-assistant/v1/users/count'         => function( $response ) {
				$return = array();
				foreach ( $response as $role => $count ) {
					$return[ 'role/' . $role ] = $count;
				}
				return $return;
			},
		);

		$requests = array_reduce( array_keys( $routes ), 'rest_preload_api_request', array() );
		$counts  = [];

		foreach ( $requests as $route => $request ) {
			$counts = array_merge( $counts, $routes[ $route ]( $request['body'] ) );
		}

		return $counts;
	}
}

FL_Assistant_REST_Counts::register_routes();