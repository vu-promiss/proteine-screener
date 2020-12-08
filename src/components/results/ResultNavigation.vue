<template>
    <p>
        <b-button size="lg" @click="prevQuestion">
        ‹ {{ $t('nav.previous') }}
        </b-button>
        <b-button size="lg" @click="startOver">
            {{ $t('nav.start_over') }}
        </b-button>
    </p>
</template>

<script>
export default {
  props: [
    'startOver',
    'prevQuestion'
  ]
}
</script>