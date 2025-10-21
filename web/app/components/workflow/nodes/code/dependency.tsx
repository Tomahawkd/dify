import type { FC } from 'react'
import React, { useCallback } from 'react'
import RemoveButton from '../_base/components/remove-button'
import type { CodeDependency } from './types'
import Input from '@/app/components/base/input'
import { replaceSpaceWithUnderscoreInVarNameInput } from '@/utils/var'

type Props = {
  dependencies: CodeDependency[]
  handleRemove: (index: number) => void
  handleChange: (index: number, dependency: CodeDependency) => void
}

const Dependencies: FC<Props> = ({
  dependencies, handleRemove, handleChange,
}) => {
  const handleDependencyNameChange = useCallback((index: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const version = dependencies[index].version || ''

      replaceSpaceWithUnderscoreInVarNameInput(e.target)
      const name = e.target.value

      const dependency: CodeDependency = { name, version }
      handleChange(index, dependency)
    }
  }, [dependencies, handleChange])

  const handleDependencyVersionChange = useCallback((index: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const name = dependencies[index].name || ''
      replaceSpaceWithUnderscoreInVarNameInput(e.target)
      const version = e.target.value
      const dependency: CodeDependency = { name, version }
      handleChange(index, dependency)
    }
  }, [dependencies, handleChange])

  return (
    <div className='space-y-2'>
      {dependencies.map((dependency, index) => (
        <div className='flex items-center space-x-1' key={index}>
          <Input
            readOnly={false}
            value={dependency.name}
            onChange={handleDependencyNameChange(index)}
            wrapperClassName='grow'
          />
          <Input
            value={dependency.version}
            onChange={handleDependencyVersionChange(index)}
            wrapperClassName='grow'
          />
          <RemoveButton
            className='!bg-gray-100 !p-2 hover:!bg-gray-200'
            onClick={() => handleRemove(index)}
          />
        </div>
      ))}
    </div>
  )
}

export default React.memo(Dependencies)
