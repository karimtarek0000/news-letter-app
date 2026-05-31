'use client'

import { ElementType, JSX, PropsWithChildren, ReactElement } from 'react'

interface LoadingRenderProps extends PropsWithChildren {
  isLoading: boolean
  loadingComponent: React.ElementType
}

const LoadingRender = ({
  isLoading,
  loadingComponent: LoadingComponent,
  children,
}: LoadingRenderProps) => {
  return isLoading ? <LoadingComponent /> : children
}

export default LoadingRender
