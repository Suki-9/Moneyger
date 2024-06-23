import MaterialButton from '@/components/global/MaterialButton.vue';
import MaterialInput from '@/components/global/MaterialInput.vue';
import MaterialDivider from '@/components/global/MaterialDivider.vue';
import MaterialModal from '@/components/global/MaterialModal.vue';
import GoogleIcon from '@/components/global/GoogleIcon.vue';
import { App } from 'vue';

const global_components = {
  install: function (app: App) {
    app.component('M-Button', MaterialButton);
    app.component('M-Input', MaterialInput);
    app.component('M-Divider', MaterialDivider);
    app.component('M-Modal', MaterialModal);
    app.component('M-Icon', GoogleIcon);
  }
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    MButton: typeof MaterialButton;
    MInput: typeof MaterialInput;
    MIcon: typeof GoogleIcon;
    MDivider: typeof MaterialDivider;
    MModal: typeof MaterialModal;
  }
}

export default global_components;
