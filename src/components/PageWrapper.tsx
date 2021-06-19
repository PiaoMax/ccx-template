import React from "react";
import { observer } from "mobx-react-lite";
import _ from "lodash";
import {Tabs } from "antd";

import {
  Breadcrumb,
} from "@cyber-ccx/lib";
import { useStore } from '@/models'

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {

  noBreadcrumb?: boolean

  title?: string

  breadcrumbBtn?: any
}

const PageWrapper: React.FC<PageProps> = ({ children, noBreadcrumb, breadcrumbBtn, title, style, ...props }) => {
  const { global } = useStore();

  return (
    <div {...props} style={{ position: 'relative', ...style }}>
      {global.pageConfig.showBreadcrumb && !noBreadcrumb &&
        <PageBlock style={{borderBottom:'1px solid #eee'}}>
          <Breadcrumb title={title} size={'big'}/>
        </PageBlock>
      }
      {(!global.pageConfig.showBreadcrumb || noBreadcrumb) && breadcrumbBtn &&
        <div style={{ padding: '15px 0', display: 'flex', justifyContent: 'flex-end' }}>
          {breadcrumbBtn}
        </div>
      }
      {children}
    </div>
  )
}

const PageBlock: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => {
  return (
    <div className={`page-block ${className}`} {...props} />
  )
}

interface TabsPageProps extends PageProps {
  tabs: { key: string, title: string }[]
  activeKey?: string
  onTabChange: (key: string) => void
}

const TabPageWrapperBase: React.FC<TabsPageProps> = ({ children, noBreadcrumb, tabs, activeKey, onTabChange, title, style, ...props }) => {
  const { global } = useStore();

  const breadcrumbBtn = (
    <Tabs onChange={onTabChange} className={'nocontent noborder'}>
      {tabs.map(v => (
        <Tabs.TabPane tab={v.title} key={v.key} />
      ))}
    </Tabs>
  )

  const isBreadcrumb = global.pageConfig.showBreadcrumb && !noBreadcrumb;

  return (
    <div {...props} style={{ position: 'relative', ...style }}>
      <PageBlock style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1, height: '22px' }}>
          {isBreadcrumb &&
            <Breadcrumb title={title} />
          }
        </div>
        <div style={{ position: "absolute", right: 0 }}>
          {breadcrumbBtn}
        </div>
      </PageBlock>
      {children}
    </div>
  )
}

const TabPageWrapper = observer(TabPageWrapperBase);

const ChildPageWrapper: React.FC<PageProps> = ({ children, className = '', ...props }) => {
  return (
    <PageWrapper className={`child-page ${className}`} {...props} style={{ position: 'absolute' }} />
  )
}
export default observer(PageWrapper);
export { PageBlock, ChildPageWrapper, TabPageWrapper };
