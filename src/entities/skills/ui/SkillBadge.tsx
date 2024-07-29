import React from 'react';
import classNames from 'classnames';
import { TSkill } from '@/entities/skills';
import { Button } from '@/shared/ui';

export const SkillBadge: React.FC<{ skill: TSkill; isActive: boolean; disabled?: boolean; onClick: HTMLButtonElement['click'] }> = ({
  skill,
  isActive,
  disabled,
  onClick,
}) => {
  return (
    <Button type="button"
            key={skill.text}
            buttonType={!!skill.id ? 'primary' : 'secondary'}
            disabled={disabled}
            className={classNames('mt-2 ml-2', { '!bg-primary-200 !border-primary-200': isActive })}
            size="small"
            onClick={onClick}
    >
      {skill.text}
    </Button>
  );
};
