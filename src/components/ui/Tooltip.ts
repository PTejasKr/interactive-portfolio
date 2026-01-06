// Tooltip.ts - Tooltip component

export interface TooltipProps {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export class Tooltip {
  private props: TooltipProps;
  private tooltip: HTMLElement | null = null;
  private targetElement: HTMLElement | null = null;

  constructor(props: TooltipProps) {
    this.props = {
      position: 'top',
      ...props,
    };
  }

  attach(element: HTMLElement): void {
    this.targetElement = element;
    this.createTooltip();
    this.setupEventListeners();
  }

  private createTooltip(): void {
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'tooltip';
    this.tooltip.textContent = this.props.text;
    this.tooltip.style.cssText = `
      position: absolute;
      background: #0B0B0B;
      color: white;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-family: 'Inter', sans-serif;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s, transform 0.2s;
      z-index: 1000;
    `;

    document.body.appendChild(this.tooltip);
  }

  private setupEventListeners(): void {
    this.targetElement?.addEventListener('mouseenter', () => this.show());
    this.targetElement?.addEventListener('mouseleave', () => this.hide());
  }

  private show(): void {
    if (!this.tooltip || !this.targetElement) return;

    const rect = this.targetElement.getBoundingClientRect();
    const tooltipRect = this.tooltip.getBoundingClientRect();

    const positions = {
      top: {
        left: rect.left + rect.width / 2 - tooltipRect.width / 2,
        top: rect.top - tooltipRect.height - 8,
      },
      bottom: {
        left: rect.left + rect.width / 2 - tooltipRect.width / 2,
        top: rect.bottom + 8,
      },
      left: {
        left: rect.left - tooltipRect.width - 8,
        top: rect.top + rect.height / 2 - tooltipRect.height / 2,
      },
      right: {
        left: rect.right + 8,
        top: rect.top + rect.height / 2 - tooltipRect.height / 2,
      },
    };

    const pos = positions[this.props.position!];
    this.tooltip.style.left = `${pos.left}px`;
    this.tooltip.style.top = `${pos.top}px`;
    this.tooltip.style.opacity = '1';
  }

  private hide(): void {
    if (this.tooltip) {
      this.tooltip.style.opacity = '0';
    }
  }

  destroy(): void {
    this.tooltip?.remove();
  }
}
