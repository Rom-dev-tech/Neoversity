<?php defined('ABSPATH') || exit; ?>

<!DOCTYPE html>
<html <?php language_attributes(); ?> dir="ltr">

<head>
  <meta charset="<?php bloginfo('charset'); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no">
  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

  <?php
  /**
   * Before Body Hook
   *
   */
  do_action('global_before_body');
  ?>

  <?= get_template_part('template-parts/part', _TEMPLATE_VERSION) ?>

  <?php
  /**
   * After Body Hook
   *
   * googletagmanager: 10
   */
  do_action('global_after_body');
  ?>

  <?php
  wp_footer();
  ?>
</body>

</html>