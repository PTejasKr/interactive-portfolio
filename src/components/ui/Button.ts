// Button.ts - Interactive button component

export interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  icon?: string;
}

export class Button {
  private props: ButtonProps;

  constructor(props: ButtonProps) {
    this.props = {
      variant: 'primary',
      size: 'md',
      disabled: false,
      ...props,
    };
  }

  render(): string {
    const { text, variant, size, disabled, icon } = this.props;

    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses = {
      primary: 'bg-accent-aqua text-dark hover:bg-aqua-dark focus:ring-accent-aqua',
      secondary: 'bg-white text-dark border-2 border-dark hover:bg-gray-100 focus:ring-dark',
      ghost: 'bg-transparent text-dark hover:bg-white/50 focus:ring-accent-aqua',
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

    return `
      <button
        class="${baseClasses} ${variantClasses[variant!]} ${sizeClasses[size!]} ${disabledClasses}"
        ${disabled ? 'disabled' : ''}
        data-cursor-hover
      >
        ${icon ? `<span class="mr-2">${icon}</span>` : ''}
        ${text}
      </button>
    `;
  }

  init(selector: string): void {
    const button = document.querySelector(selector);
    if (button && this.props.onClick) {
      button.addEventListener('click', this.props.onClick);
    }
  }
}
