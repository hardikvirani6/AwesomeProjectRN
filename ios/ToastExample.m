//
//  ToastExample.m
//  AwesomeProjectRN
//
//  Created by Hardik Virani on 05/06/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "ToastExample.h"
#import <React/RCTLog.h>

@implementation ToastExample

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(show:(NSString *)name callback:(RCTResponseSenderBlock)callback)
{
  NSString *events = name;
  callback(@[[NSNull null], events]);
}
@end
