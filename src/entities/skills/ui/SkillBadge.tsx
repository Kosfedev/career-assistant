import React from 'react';
import classNames from 'classnames';
import { TSkill } from '@/entities/skills';
import { Button } from '@/shared/ui';

export const SkillBadge: React.FC<{ skill: TSkill; isActive: boolean; onClick: HTMLButtonElement['click'] }> = ({
  skill,
  isActive,
  onClick,
}) => {
  return (
    <Button type="button"
            key={skill.text}
            buttonType={!!skill.id ? 'primary' : 'secondary'}
            className={classNames('mt-2 ml-2', { '!bg-primary-200 !border-primary-200': isActive })}
            size="small"
            onClick={onClick}
    >
      {skill.text}
    </Button>
  );
};
